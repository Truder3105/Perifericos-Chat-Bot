import { qs } from "./utils/dom.js";
import { setActiveNav } from "./components/navbar.js";

const ROUTE_TABLE = {
  "#home": { page: "home.html", title: "Home", subtitle: "Historia de la IA en los periféricos" },
  "#persona": {
    page: "persona.html",
    title: "Persona transhumana",
    subtitle: "Declaración institucional y filosofía del proyecto",
  },
  "#mouse": { page: "mouse.html", title: "Mouse", subtitle: "Hardware de puntería de élite" },
  "#teclados": { page: "teclados.html", title: "Teclados", subtitle: "Hall Effect + Rapid Trigger" },
  "#mousepads": { page: "mousepads.html", title: "Mousepads", subtitle: "Superficies y bases de nicho" },
  "#monitores": { page: "monitores.html", title: "Monitores", subtitle: "Hz, paneles e input lag" },
  "#iems": { page: "iems.html", title: "IEMs", subtitle: "Audio competitivo y posicionalidad" },
  "#instructores": { page: "instructores.html", title: "Instructores", subtitle: "Perfil del curso" },
  "#contacto": { page: "contacto.html", title: "Contacto", subtitle: "Formulario de contacto" },
};

export function createRouter({ onAfterRoute }) {
  const app = qs("#app");
  const titleEl = qs("#pageTitle");
  const subtitleEl = qs("#pageSubtitle");

  const navigate = async (hash) => {
    const routeHash = ROUTE_TABLE[hash] ? hash : "#home";
    const route = ROUTE_TABLE[routeHash];

    setActiveNav(routeHash);
    if (titleEl) titleEl.textContent = route.title;
    if (subtitleEl) subtitleEl.textContent = route.subtitle;

    if (!app) return;
    app.innerHTML = `<div class="section">Cargando…</div>`;

    const html = await fetch(`./pages/${route.page}`, { cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error(`No se pudo cargar pages/${route.page}`);
      return r.text();
    });

    app.innerHTML = html;
    onAfterRoute?.(routeHash, app);
  };

  const start = () => {
    const current = window.location.hash || "#home";
    navigate(current);
    window.addEventListener("hashchange", () => navigate(window.location.hash || "#home"));
  };

  return { start, navigate };
}

