import { productCard, sectionHeader } from "../components/cards.js";
import { MOUSEPADS } from "../data/mousepads.data.js";

export function initMousepads(root, { rate }) {
  const target = root.querySelector("[data-mousepads]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "Mousepads de nicho",
      subtitle: "Superficie, velocidad y base: el feeling define tu consistencia.",
    })}
    <div class="section section--mousepads">
      <div class="cards">
        ${MOUSEPADS.map((item) => productCard({ item, rate })).join("")}
      </div>
    </div>
  `;
}

