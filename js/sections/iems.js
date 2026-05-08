import { productCard, sectionHeader } from "../components/cards.js";
import { IEMS } from "../data/iems.data.js";

export function initIems(root, { rate }) {
  const target = root.querySelector("[data-iems]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "IEMs / Audífonos HiFi competitivos",
      subtitle: "Drivers dinámicos, planares y BA: posicionalidad y detalle para FPS.",
    })}
    <div class="section section--iems">
      <div class="cards">
        ${IEMS.map((item) => productCard({ item, rate })).join("")}
      </div>
    </div>
  `;
}

