/**
 * Declaración institucional Persona Transhumana (criterio docente).
 * Reutilizable en chatbot, sección del sitio y system prompt.
 */

export const PERSONA_TRANSHUMANA_QUOTE =
  "Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes.";

/** Glosa en inglés (la cita oficial del sitio permanece en español). */
export const PERSONA_TRANSHUMANA_QUOTE_EN =
  "I am FREE, AUTONOMOUS, AND RESPONSIBLE through dialogue and construction, as a regulative ideal; I direct myself, I control myself, and I dictate my own laws.";

export const PERSONA_TRANSHUMANA_THEMES = [
  "Desarrollo humano",
  "Ética",
  "Autonomía",
  "Transformación positiva",
  "Bienestar",
  "Evolución personal",
  "Responsabilidad social",
];

export const PERSONA_TRANSHUMANA_THEMES_EN = [
  "Human development",
  "Ethics",
  "Autonomy",
  "Positive transformation",
  "Well-being",
  "Personal growth",
  "Social responsibility",
];

/** Mensaje inicial del chatbot (bienvenida bilingüe + declaración + temas). */
export function getChatbotWelcomeMessage() {
  const bulletsEs = PERSONA_TRANSHUMANA_THEMES.map((t) => `• ${t}`).join("\n");
  const bulletsEn = PERSONA_TRANSHUMANA_THEMES_EN.map((t) => `• ${t}`).join("\n");

  const es = [
    "ES — Bienvenida: este asistente combina contenido técnico del sitio con la Declaración Persona Transhumana:",
    "",
    `«${PERSONA_TRANSHUMANA_QUOTE}»`,
    "",
    "Ejes (español):",
    bulletsEs,
    "",
    "Pregunta por mouse, teclados HE, mousepads, monitores o IEMs. Comandos: /key · /clearkey · /persona · sección #persona.",
  ].join("\n");

  const en = [
    "EN — Welcome: this assistant combines the site’s technical content with the Transhuman Person declaration (official Spanish text below):",
    "",
    `«${PERSONA_TRANSHUMANA_QUOTE}»`,
    "",
    "English gloss:",
    `“${PERSONA_TRANSHUMANA_QUOTE_EN}”`,
    "",
    "Themes:",
    bulletsEn,
    "",
    "Ask about mice, HE keyboards, mousepads, monitors, or IEMs. Commands: /key · /clearkey · /persona · #persona section.",
  ].join("\n");

  return `${es}\n\n---\n\n${en}`;
}

/**
 * Recordatorio de la declaración.
 * @param {"es" | "en" | "both"} locale
 */
export function getChatbotPersonaReminder(locale = "es") {
  const es = [
    "Declaración Persona Transhumana:",
    `«${PERSONA_TRANSHUMANA_QUOTE}»`,
    "",
    "Temas relacionados: " + PERSONA_TRANSHUMANA_THEMES.join(" · ") + ".",
    "En el sitio: sección «Persona transhumana» en el menú lateral (#persona).",
  ].join("\n");

  const en = [
    "Transhuman Person declaration (official Spanish):",
    `«${PERSONA_TRANSHUMANA_QUOTE}»`,
    "",
    "English gloss:",
    `“${PERSONA_TRANSHUMANA_QUOTE_EN}”`,
    "",
    "Related themes: " + PERSONA_TRANSHUMANA_THEMES_EN.join(" · ") + ".",
    "On the site: “Persona transhumana” in the sidebar (#persona).",
  ].join("\n");

  if (locale === "en") return en;
  if (locale === "both") return `${es}\n\n---\n\n${en}`;
  return es;
}
