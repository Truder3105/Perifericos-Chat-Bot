import { productCard, sectionHeader } from "../components/cards.js";
import { MONITORS } from "../data/monitores.data.js";

export function initMonitores(root, { rate }) {
  const target = root.querySelector("[data-monitores]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "Monitores competitivos",
      subtitle: "TN vs IPS Fast, 240–540Hz y el impacto real en input lag.",
    })}
    <div class="section section--monitores">
      <div class="cards">
        ${MONITORS.map((item) => productCard({ item, rate })).join("")}
      </div>
    </div>
  `;
}

