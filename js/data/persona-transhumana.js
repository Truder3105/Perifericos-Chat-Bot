/**
 * Declaración institucional Persona Transhumana (criterio docente).
 * Reutilizable en chatbot, sección del sitio y system prompt.
 */

export const PERSONA_TRANSHUMANA_QUOTE =
  "Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulativo; me dirijo, controlo y dicto mis propias leyes.";

export const PERSONA_TRANSHUMANA_THEMES = [
  "Desarrollo humano",
  "Ética",
  "Autonomía",
  "Transformación positiva",
  "Bienestar",
  "Evolución personal",
  "Responsabilidad social",
];

/** Mensaje inicial del chatbot (bienvenida + declaración + temas). */
export function getChatbotWelcomeMessage() {
  const bullets = PERSONA_TRANSHUMANA_THEMES.map((t) => `• ${t}`).join("\n");
  return [
    "Bienvenida · Este asistente se orienta, además del contenido técnico del sitio, por la Declaración Persona Transhumana:",
    "",
    `«${PERSONA_TRANSHUMANA_QUOTE}»`,
    "",
    "Ejes que articulamos con el aprendizaje responsable sobre tecnología y periféricos:",
    bullets,
    "",
    "Pregunta por mouse, teclados HE, mousepads, monitores o IEMs. Comandos: /key · /clearkey · /persona (repite esta declaración).",
    "Más contexto en el menú: Persona transhumana (#persona).",
  ].join("\n");
}

/** Respuesta corta para comando /persona o recordatorios. */
export function getChatbotPersonaReminder() {
  return [
    "Declaración Persona Transhumana:",
    `«${PERSONA_TRANSHUMANA_QUOTE}»`,
    "",
    "Temas relacionados: " + PERSONA_TRANSHUMANA_THEMES.join(" · ") + ".",
    "En el sitio: sección «Persona transhumana» en el menú lateral.",
  ].join("\n");
}
