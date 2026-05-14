import { sectionHeader } from "../components/cards.js";
import { PERSONA_TRANSHUMANA_QUOTE } from "../data/persona-transhumana.js";

export function initHome(root) {
  const target = root.querySelector("[data-home]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "Historia de la IA en los periféricos",
      subtitle:
        "De hardware genérico a sensores y materiales optimizados: menos latencia, más consistencia, mejor tracking.",
    })}
    <div class="section persona-home-strip">
      <h3>Persona transhumana</h3>
      <p class="persona-home-strip__quote">«${PERSONA_TRANSHUMANA_QUOTE}»</p>
      <p class="persona-home-strip__hint">
        Filosofía orientadora del proyecto y del chatbot. Ver ejes y módulo reflexivo en la sección dedicada.
      </p>
      <a class="btn btn--primary" href="#persona">Abrir declaración y ejes</a>
    </div>
    <div class="section">
      <h3>Timeline (resumen)</h3>
      <ol class="timeline">
        <li>De 125Hz a 1000Hz: salto en consistencia de input.</li>
        <li>Optimización de sensores (PixArt) y firmware.</li>
        <li>Polling 4K/8K: mejoras marginales en escenarios específicos.</li>
        <li>Materiales ligeros (magnesio/ABS premium) y skates PTFE.</li>
        <li>HE + Rapid Trigger: teclas analógicas para resets más rápidos.</li>
      </ol>
      <div class="kpi">
        <div class="kpi__item">
          <div class="kpi__value">8K</div>
          <div class="kpi__label">Polling rate (máx.)</div>
        </div>
        <div class="kpi__item">
          <div class="kpi__value">40–75g</div>
          <div class="kpi__label">Rango de peso (mouse nicho)</div>
        </div>
        <div class="kpi__item">
          <div class="kpi__value">240–540Hz</div>
          <div class="kpi__label">Monitores competitivos</div>
        </div>
      </div>
    </div>
  `;
}

