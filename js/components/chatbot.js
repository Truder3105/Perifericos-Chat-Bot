import { qs, escapeHtml, on } from "../utils/dom.js";
import { httpJson } from "../utils/fetch.js";
import { KNOWLEDGE_BASE } from "../data/knowledge-base.js";
import { setGeminiKeyInBrowser } from "../config.js";

const STORAGE_KEY = "chat_history_v1";
const MAX_TURNS = 20;

export function mountChatbot({ config }) {
  const root = qs("#chatbotRoot");
  if (!root) return;

  root.innerHTML = `
    <section class="chatbot" id="chatbot" aria-label="Chatbot">
      <div class="chatbot__header">
        <div>
          <h3 class="chatbot__title">Chat · PeriféricosPRO</h3>
          <div class="chatbot__meta">Gemini (opcional) · Respuestas limitadas al sitio</div>
        </div>
        <button class="chatbot__close" type="button" id="chatbotClose">Cerrar</button>
      </div>
      <div class="chatbot__messages" id="chatMessages"></div>
      <form class="chatbot__composer" id="chatForm">
        <input class="chatbot__input" id="chatInput" placeholder="Pregunta por mouse, teclados HE, mousepads, monitores o IEMs…" />
        <button class="btn btn--primary" type="submit">Enviar</button>
      </form>
      <div class="chatbot__hint">
        Tip: para habilitar Gemini, pega tu API key con <span class="mono">/key TU_API_KEY</span>
      </div>
    </section>
  `;

  const el = qs("#chatbot", root);
  const messagesEl = qs("#chatMessages", root);
  const form = qs("#chatForm", root);
  const input = qs("#chatInput", root);
  const closeBtn = qs("#chatbotClose", root);

  const state = {
    history: loadHistory(),
    apiKey: config.geminiApiKey || "",
  };

  const renderAll = () => {
    messagesEl.innerHTML = state.history
      .map((m) => {
        const cls = m.role === "user" ? "bubble bubble--user" : "bubble bubble--assistant";
        return `<div class="${cls}">${escapeHtml(m.text)}</div>`;
      })
      .join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const push = (role, text) => {
    state.history.push({ role, text });
    state.history = state.history.slice(-MAX_TURNS * 2);
    saveHistory(state.history);
    renderAll();
  };

  renderAll();

  const close = () => el.classList.remove("is-open");
  const open = () => el.classList.add("is-open");
  const toggle = () => el.classList.toggle("is-open");

  const api = { open, close, toggle };

  on(closeBtn, "click", close);
  on(window, "keydown", (e) => {
    if (e.key === "Escape") close();
  });

  on(form, "submit", async (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    input.value = "";

    if (raw.startsWith("/key ")) {
      const k = raw.slice(5).trim();
      if (k) {
        state.apiKey = k;
        setGeminiKeyInBrowser(k);
        push("assistant", "Listo. API key guardada en este navegador.");
      }
      return;
    }

    push("user", raw);

    try {
      const reply = state.apiKey
        ? await askGemini({
            apiKey: state.apiKey,
            model: config.geminiModel,
            apiUrl: config.geminiApiUrl,
            history: state.history,
          })
        : fallbackAnswer(raw);
      push("assistant", reply);
    } catch (err) {
      push(
        "assistant",
        `No pude consultar Gemini ahora. Puedes configurar la key con /key ... o reintentar. Error: ${String(
          err?.message || err,
        )}`,
      );
    }
  });

  return api;
}

function fallbackAnswer(userText) {
  const t = userText.toLowerCase();
  if (
    /(mouse|teclad|hall|rapid|polling|mousepad|monitor|iem|audífono|audifono|zowie|pulsar|lamzu|g wolves|gwolves|w lmouse|wlmouse|atk|aula)/i.test(
      t,
    )
  ) {
    return "Puedo ayudarte con comparaciones, conceptos (polling rate, HE, rapid trigger) y precios en COP/USD. Si quieres habilitar respuestas con Gemini: escribe /key TU_API_KEY.";
  }
  return 'Solo puedo ayudarte con información sobre periféricos competitivos de nicho y los contenidos de este sitio.';
}

async function askGemini({ apiKey, model, apiUrl, history }) {
  const contents = [];
  contents.push({
    role: "user",
    parts: [{ text: KNOWLEDGE_BASE }],
  });

  // Convertimos historial a formato Gemini (simplificado)
  const turns = history.slice(-MAX_TURNS * 2);
  for (const m of turns) {
    contents.push({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    });
  }

  const payload = { contents };

  const candidates = uniqueModels([
    model,
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-pro-latest",
  ]);

  let lastErr;
  for (const m of candidates) {
    try {
      const url = `${apiUrl}/${m}:generateContent`;
      const data = await httpJson(url, {
        method: "POST",
        headers: { "X-goog-api-key": apiKey },
        body: JSON.stringify(payload),
      });

      const text =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
        "No recibí respuesta.";
      return String(text).trim();
    } catch (err) {
      lastErr = err;
      const msg = String(err?.message || err);
      if (!/not found|NOT_FOUND|models\//i.test(msg)) throw err;
      // si el modelo no existe/soporta generateContent, probamos el siguiente
    }
  }

  throw lastErr || new Error("No se pudo consultar Gemini.");
}

function uniqueModels(models) {
  const out = [];
  const seen = new Set();
  for (const m of models) {
    const mm = String(m || "").trim();
    if (!mm) continue;
    if (seen.has(mm)) continue;
    seen.add(mm);
    out.push(mm);
  }
  return out;
}

function loadHistory() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

