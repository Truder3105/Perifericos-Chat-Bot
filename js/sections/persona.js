import {
  PERSONA_TRANSHUMANA_QUOTE,
  PERSONA_TRANSHUMANA_THEMES,
} from "../data/persona-transhumana.js";

export function initPersona(root) {
  const target = root.querySelector("[data-persona]");
  if (!target) return;

  target.innerHTML = `
    <div class="persona-hero">
      <p class="persona-hero__kicker">Filosofía orientadora del proyecto</p>
      <h2 class="persona-hero__title">Persona transhumana</h2>
      <p class="persona-hero__lead">
        Esta landing articula el estudio de periféricos competitivos con una mirada formativa:
        autonomía en el criterio, ética en la información y bienestar en el uso de la tecnología.
      </p>
    </div>

    <figure class="persona-quote">
      <blockquote>
        <p>«${escape(PERSONA_TRANSHUMANA_QUOTE)}»</p>
      </blockquote>
      <figcaption>Declaración institucional integrada en el chatbot y en la navegación del sistema.</figcaption>
    </figure>

    <section class="section persona-grid">
      <h3>Ejes vinculados</h3>
      <p class="persona-grid__intro">
        Relacionamos estos temas con el proyecto: decisiones informadas sobre hardware, consumo responsable,
        equilibrio entre rendimiento y salud (postura, audición, descansos) y comunidad (compartir conocimiento con rigor).
      </p>
      <ul class="persona-pill-list">${PERSONA_TRANSHUMANA_THEMES.map(
        (t) => `<li><span class="pill">${escape(t)}</span></li>`,
      ).join("")}</ul>
    </section>

    <section class="section persona-reflex">
      <h3>Módulo reflexivo</h3>
      <ul class="persona-reflex__list">
        <li><strong>Autonomía:</strong> elegir periféricos según tu agarre, juego y presupuesto, no solo por tendencia.</li>
        <li><strong>Ética:</strong> contrastar precios y fuentes; evitar desinformación sobre “ganancias mágicas” de Hz o polling.</li>
        <li><strong>Bienestar:</strong> monitorear fatiga visual y auditiva; pausas y ergonomía importan tanto como el DPI.</li>
        <li><strong>Responsabilidad social:</strong> recomendar con transparencia y respeto al entorno (compra consciente, obsolescencia).</li>
      </ul>
      <p class="persona-reflex__cta">
        En el <strong>chat</strong> encontrarás la misma declaración al inicio y con el comando <span class="mono">/persona</span>.
      </p>
    </section>
  `;
}

function escape(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
