/**
 * Gemini Generative Language API helpers (browser).
 * Lista modelos disponibles para la key y elige uno que soporte generateContent.
 */

const BASE = "https://generativelanguage.googleapis.com/v1beta";

/** Orden de preferencia si ListModels falla o devuelve vacío. */
export const FALLBACK_MODEL_IDS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
];

export function normalizeModelId(id) {
  let s = String(id || "").trim();
  if (!s) return "";
  if (s.startsWith("models/")) s = s.slice("models/".length);
  const idx = s.indexOf(":");
  if (idx !== -1) s = s.slice(0, idx);
  return s;
}

/**
 * GET …/v1beta/models (paginado) y devuelve ids cortos (ej. gemini-2.0-flash)
 * que soportan generateContent.
 */
export async function listGenerateContentModelIds(apiKey) {
  const ids = [];
  let pageToken = "";

  for (let page = 0; page < 15; page++) {
    const url = new URL(`${BASE}/models`);
    url.searchParams.set("pageSize", "100");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString(), {
      headers: { "X-goog-api-key": apiKey },
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      const msg =
        (data && (data.error?.message || data.message)) ||
        `HTTP ${res.status} ${res.statusText}`;
      const err = new Error(msg);
      err.status = res.status;
      err.apiBody = data;
      throw err;
    }

    const models = data?.models || [];
    for (const m of models) {
      const methods = m.supportedGenerationMethods || [];
      if (!methods.includes("generateContent")) continue;
      const name = m.name || "";
      const short = name.startsWith("models/") ? name.slice("models/".length) : name;
      if (short) ids.push(short);
    }

    pageToken = data?.nextPageToken || "";
    if (!pageToken) break;
  }

  return ids;
}

/**
 * Ordena candidatos: primero el configurado si existe, luego preferidos conocidos, luego el resto.
 */
export function orderModelCandidates(availableIds, configuredModel) {
  const configured = normalizeModelId(configuredModel);
  const available = new Set(availableIds);
  const out = [];

  const push = (id) => {
    const n = normalizeModelId(id);
    if (!n || !available.has(n)) return;
    if (out.includes(n)) return;
    out.push(n);
  };

  if (configured) push(configured);
  for (const id of FALLBACK_MODEL_IDS) push(id);
  for (const id of availableIds) push(id);

  return out;
}

export function generateContentUrl(modelId) {
  const m = normalizeModelId(modelId);
  return `${BASE}/models/${encodeURIComponent(m)}:generateContent`;
}
