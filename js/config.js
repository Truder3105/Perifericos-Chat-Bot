const DEFAULTS = {
  siteName: "PeriféricosPRO",
  siteLang: "es-CO",
  defaultCurrency: "COP",
  secondaryCurrency: "USD",
  usdToCopRate: 4150,
  geminiModel: "gemini-2.0-flash",
  geminiApiUrl: "https://generativelanguage.googleapis.com/v1beta/models",
};

/**
 * En sitios estáticos el navegador no puede leer `.env`.
 * Estrategia:
 * - intenta cargar `./env.json` (opcional; NO recomendado para secretos en producción)
 * - permite definir `GEMINI_API_KEY` vía localStorage
 */
export async function loadConfig() {
  const fromJson = await tryLoadEnvJson();
  const geminiApiKey =
    localStorage.getItem("GEMINI_API_KEY") ||
    fromJson.GEMINI_API_KEY ||
    "";

  return {
    ...DEFAULTS,
    ...normalize(fromJson),
    geminiApiKey,
  };
}

async function tryLoadEnvJson() {
  try {
    const res = await fetch("./env.json", { cache: "no-store" });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

function normalize(raw) {
  if (!raw || typeof raw !== "object") return {};

  const usdToCopRate = raw.USD_TO_COP_RATE ? Number(raw.USD_TO_COP_RATE) : undefined;

  const out = {};

  setIfDefined(out, "siteName", raw.SITE_NAME);
  setIfDefined(out, "siteLang", raw.SITE_LANG);
  setIfDefined(out, "defaultCurrency", raw.DEFAULT_CURRENCY);
  setIfDefined(out, "secondaryCurrency", raw.SECONDARY_CURRENCY);
  if (Number.isFinite(usdToCopRate)) out.usdToCopRate = usdToCopRate;

  setIfDefined(out, "geminiModel", raw.GEMINI_MODEL);
  setIfDefined(out, "geminiApiUrl", raw.GEMINI_API_URL);

  return out;
}

function setIfDefined(target, key, value) {
  if (value === undefined || value === null || value === "") return;
  target[key] = value;
}

export function setGeminiKeyInBrowser(apiKey) {
  if (!apiKey) return;
  localStorage.setItem("GEMINI_API_KEY", apiKey);
}
