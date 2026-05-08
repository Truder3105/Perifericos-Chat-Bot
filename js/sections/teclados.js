import { productCard, sectionHeader } from "../components/cards.js";
import { KEYBOARDS } from "../data/teclados.data.js";

export function initTeclados(root, { rate }) {
  const target = root.querySelector("[data-teclados]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "Teclados magnéticos (Hall Effect)",
      subtitle: "Lectura analógica + Rapid Trigger para resets rápidos y consistencia.",
    })}
    <div class="section section--teclados">
      <div class="cards">
        ${KEYBOARDS.map((item) => productCard({ item, rate })).join("")}
      </div>
    </div>
  `;
}

