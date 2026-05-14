import { loadConfig } from "./config.js";
import { mountNavbar } from "./components/navbar.js";
import { mountChatbot } from "./components/chatbot.js";
import { createRouter } from "./router.js";
import { qs } from "./utils/dom.js";

import { initHome } from "./sections/home.js";
import { initPersona } from "./sections/persona.js";
import { initMouse } from "./sections/mouse.js";
import { initTeclados } from "./sections/teclados.js";
import { initMousepads } from "./sections/mousepads.js";
import { initMonitores } from "./sections/monitores.js";
import { initIems } from "./sections/iems.js";
import { initInstructores } from "./sections/instructores.js";
import { initContacto } from "./sections/contacto.js";

const yearEl = qs("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const sidebar = qs(".sidebar");
const navToggle = qs("#navToggle");
navToggle?.addEventListener("click", () => {
  const open = sidebar?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

const config = await loadConfig();

mountNavbar({
  onNavigate: () => {
    // cerrar drawer en móvil al navegar
    if (sidebar?.classList.contains("is-open")) {
      sidebar.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  },
});

const chatbotApi = mountChatbot({ config });
qs("#openChatbot")?.addEventListener("click", () => chatbotApi?.toggle());

const router = createRouter({
  onAfterRoute: (hash, appRoot) => {
    const ctx = { rate: config.usdToCopRate };
    if (hash === "#home") initHome(appRoot);
    if (hash === "#persona") initPersona(appRoot);
    if (hash === "#mouse") initMouse(appRoot, ctx);
    if (hash === "#teclados") initTeclados(appRoot, ctx);
    if (hash === "#mousepads") initMousepads(appRoot, ctx);
    if (hash === "#monitores") initMonitores(appRoot, ctx);
    if (hash === "#iems") initIems(appRoot, ctx);
    if (hash === "#instructores") initInstructores(appRoot);
    if (hash === "#contacto") initContacto(appRoot);
  },
});

router.start();

