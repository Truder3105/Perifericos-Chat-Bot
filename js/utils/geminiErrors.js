/**
 * Mensajes claros para errores comunes de Gemini en el navegador.
 */

const DOCS_RATE = "https://ai.google.dev/gemini-api/docs/rate-limits";
const DOCS_USAGE = "https://ai.dev/rate-limit";
const DOCS_KEYS = "https://aistudio.google.com/app/apikey";

function rpcReason(apiBody) {
  const details = apiBody?.error?.details;
  if (!Array.isArray(details)) return null;
  for (const d of details) {
    if (String(d?.["@type"] || "").includes("ErrorInfo") && d?.reason) return d.reason;
  }
  return null;
}

export function formatGeminiChatError(err) {
  const msg = String(err?.message || err);
  const status = err?.status;
  const body = err?.apiBody;
  const reason = rpcReason(body);

  if (reason === "API_KEY_INVALID" || /API key expired|API_KEY_INVALID|invalid api key/i.test(msg)) {
    return [
      "Tu API key de Gemini no es válida o ya expiró.",
      `Genera una nueva en Google AI Studio: ${DOCS_KEYS}`,
      "Luego en el chat escribe: /key TU_NUEVA_API_KEY",
      "Borra la key vieja del navegador: DevTools → Application → Local Storage → borra GEMINI_API_KEY.",
    ].join(" ");
  }

  if (
    status === 403 ||
    reason === "PERMISSION_DENIED" ||
    /PERMISSION_DENIED|permission denied/i.test(msg)
  ) {
    return [
      "La API rechazó la petición (permisos). Revisa que la API key pertenezca al proyecto correcto y que Generative Language API esté habilitada.",
      `Claves: ${DOCS_KEYS}`,
    ].join(" ");
  }

  if (
    status === 429 ||
    reason === "RESOURCE_EXHAUSTED" ||
    /Quota exceeded|exceeded your current quota|free_tier|rate limit/i.test(msg)
  ) {
    return [
      "Se agotó la cuota o el límite de uso de Gemini (plan gratuito o límite por minuto/día).",
      "Opciones: espera unos minutos y reintenta; revisa uso y límites en la consola de Google AI; si tu cuenta muestra límite 0, activa facturación o usa otro proyecto con cuota disponible.",
      `Límites: ${DOCS_RATE} · Uso: ${DOCS_USAGE}`,
    ].join(" ");
  }

  if (/not found|NOT_FOUND|models\//i.test(msg)) {
    return [
      "El modelo solicitado no está disponible para tu cuenta o no admite generateContent.",
      "Prueba otra key/proyecto o revisa modelos en AI Studio.",
    ].join(" ");
  }

  return [
    "No pude obtener respuesta de Gemini.",
    `Detalle técnico: ${msg}`,
    `Si es cuota o límites: ${DOCS_RATE}`,
  ].join(" ");
}

export function isGeminiAuthKeyError(err) {
  const msg = String(err?.message || err);
  const reason = rpcReason(err?.apiBody);
  if (reason === "API_KEY_INVALID") return true;
  if (/API key expired|API_KEY_INVALID|invalid api key/i.test(msg)) return true;
  if (err?.status === 400 && /expired.*key|API key/i.test(msg)) return true;
  return false;
}

export function isGeminiNotFoundModelError(err) {
  const msg = String(err?.message || err);
  return /not found|NOT_FOUND|models\//i.test(msg);
}

export function isGeminiQuotaOrRateError(err) {
  const msg = String(err?.message || err);
  const reason = rpcReason(err?.apiBody);
  if (err?.status === 429) return true;
  if (reason === "RESOURCE_EXHAUSTED") return true;
  if (/Quota exceeded|exceeded your current quota|free_tier|rate limit/i.test(msg)) return true;
  return false;
}
