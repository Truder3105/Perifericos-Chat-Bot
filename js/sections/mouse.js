import { productCard, sectionHeader } from "../components/cards.js";
import { openModal } from "../components/modal.js";
import { MOUSE_PRODUCTS } from "../data/mouse.data.js";

export function initMouse(root, { rate }) {
  const target = root.querySelector("[data-mouse]");
  if (!target) return;

  target.innerHTML = `
    ${sectionHeader({
      title: "Mouse — Hardware de puntería de élite",
      subtitle: "Formas, tamaños, sensores y pesos. Enfocado a competitivo.",
    })}
    <div class="section section--mouse">
      <div class="cards">
        ${MOUSE_PRODUCTS.map((item) => productCard({ item, rate })).join("")}
      </div>
    </div>
  `;

  target.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-details]");
    if (!btn) return;
    const id = btn.getAttribute("data-details");
    const item = MOUSE_PRODUCTS.find((x) => x.id === id);
    if (!item) return;
    openModal({
      title: item.name,
      contentHtml: `
        <div class="pill">Sugerencia</div>
        <p>Describe tu agarre (palm/claw/fingertip), tamaño de mano y juegos principales para recomendarte mejor.</p>
        <div class="pill">Meta</div>
        <p>${(item.meta || []).join(" · ")}</p>
      `,
    });
  });
}

