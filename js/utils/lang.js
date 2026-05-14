/**
 * Detección ligera de idioma para respuestas del chatbot (es / en).
 * Heurística por marcadores; si no hay señal clara, por defecto español (sitio es-CO).
 */

/**
 * @param {string} text
 * @returns {"es" | "en"}
 */
export function detectResponseLanguage(text) {
  const s = String(text || "").trim();
  if (!s) return "es";

  if (s.startsWith("/")) {
    const cmd = s.slice(1).split(/\s+/)[0]?.toLowerCase() || "";
    if (["key", "clearkey", "persona", "declaracion"].includes(cmd)) return "es";
  }

  const lower = s.toLowerCase();

  const spanishStrong =
    /[áéíóúüñ¿¡]/i.test(s) ||
    /\b(qu[eé]|cu[aá]l(es)?|c[oó]mo|d[oó]nde|cu[aá]ndo|por qu[eé]|porque|muy|tambi[eé]n|gracias|hola|buenos|recomi[eé]ndame|necesito|quiero|soy|est[aá]|estoy|precio|teclado|rat[oó]n|aud[ií]fonos)\b/i.test(
      lower,
    );

  const englishStrong =
    /\b(what|which|how|why|when|where|please|thanks|hello|hi|recommend|should|could you|can you|about|worth|budget|buy|best|keyboard|headphones|mousepad|monitor|polling|switch)\b/i.test(
      lower,
    );

  if (spanishStrong && !englishStrong) return "es";
  if (englishStrong && !spanishStrong) return "en";

  if (spanishStrong && englishStrong) {
    const esScore = (lower.match(/\b(el|la|los|las|un|una|para|con|muy)\b/g) || []).length;
    const enScore = (lower.match(/\b(the|a|an|and|with|for|very)\b/g) || []).length;
    return enScore > esScore ? "en" : "es";
  }

  const latinExtended = /[áéíóúüñ]/i.test(s);
  if (latinExtended) return "es";

  const words = lower.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "es";

  let asciiLike = 0;
  for (const w of words) {
    if (/^[a-z0-9\-_'./]+$/i.test(w) && /[a-z]/i.test(w)) asciiLike++;
  }
  const ratio = asciiLike / words.length;
  if (ratio >= 0.85 && words.length >= 3) return "en";

  return "es";
}
