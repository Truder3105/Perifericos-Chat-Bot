import { on, qs } from "../utils/dom.js";

export function openModal({ title, contentHtml }) {
  const root = qs("#modalRoot");
  if (!root) return { close: () => {} };

  root.innerHTML = `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">${title}</h3>
          <button class="modal__close" type="button" data-close>Close</button>
        </div>
        <div class="modal__body">${contentHtml}</div>
      </div>
    </div>
  `;

  const overlay = qs(".modal-overlay", root);
  const closeBtn = qs("[data-close]", root);

  const unsubs = [];

  const close = () => {
    root.innerHTML = "";
    cleanup();
  };

  unsubs.push(
    on(overlay, "click", (e) => {
      if (e.target === overlay) close();
    }),
  );
  unsubs.push(on(closeBtn, "click", close));
  unsubs.push(
    on(window, "keydown", (e) => {
      if (e.key === "Escape") close();
    }),
  );

  const cleanup = () => unsubs.splice(0).forEach((fn) => fn());
  return { close, cleanup };
}

