import { qs } from "../utils/dom.js";

export const ROUTES = [
  { hash: "#home", label: "Home", hint: "Historia + timeline" },
  { hash: "#mouse", label: "Mouse", hint: "Puntería de élite" },
  { hash: "#teclados", label: "Teclados", hint: "Hall Effect" },
  { hash: "#mousepads", label: "Mousepads", hint: "Speed/Control" },
  { hash: "#monitores", label: "Monitores", hint: "240–540Hz" },
  { hash: "#iems", label: "IEMs", hint: "Audio posicional" },
  { hash: "#instructores", label: "Instructores", hint: "Perfil" },
  { hash: "#contacto", label: "Contacto", hint: "Escríbenos" },
];

export function mountNavbar({ onNavigate }) {
  const nav = qs("#navMenu");
  if (!nav) return;

  nav.innerHTML = ROUTES.map(
    (r) => `
      <a class="nav__item" href="${r.hash}" data-hash="${r.hash}">
        <span class="nav__label">${r.label}</span>
        <span class="nav__hint">${r.hint}</span>
      </a>
    `,
  ).join("");

  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-hash]");
    if (!a) return;
    const hash = a.getAttribute("data-hash");
    if (!hash) return;
    onNavigate?.(hash);
  });
}

export function setActiveNav(hash) {
  const nav = qs("#navMenu");
  if (!nav) return;
  nav.querySelectorAll(".nav__item").forEach((el) => {
    el.classList.toggle("is-active", el.getAttribute("data-hash") === hash);
  });
}

