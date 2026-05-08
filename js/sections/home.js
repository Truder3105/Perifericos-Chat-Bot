import { sectionHeader } from "../components/cards.js";

export function initHome(root) {
  const target = root.querySelector("[data-home]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "Historia de la IA en los periféricos",
      subtitle:
        "De hardware genérico a sensores y materiales optimizados: menos latencia, más consistencia, mejor tracking.",
    })}
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

