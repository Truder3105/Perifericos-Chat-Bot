import { qs } from "../utils/dom.js";

export function initContacto(root) {
  const target = root.querySelector("[data-contacto]");
  if (!target) return;

  target.innerHTML = `
    <div class="section section--contacto">
      <h2>Contáctanos</h2>
      <p class="hero__subtitle">Sin backend: el formulario valida y simula envío.</p>
      <form class="form" id="contactForm">
        <div class="field">
          <span class="label">Nombre</span>
          <input class="input" name="name" required placeholder="Tu nombre" />
        </div>
        <div class="field">
          <span class="label">Email</span>
          <input class="input" type="email" name="email" required placeholder="correo@ejemplo.com" />
        </div>
        <div class="field">
          <span class="label">Teléfono</span>
          <input class="input" name="tel" placeholder="Opcional" />
        </div>
        <div class="field">
          <span class="label">Categoría</span>
          <select class="select" name="category" required>
            <option value="">Selecciona…</option>
            <option>Mouse</option>
            <option>Teclados HE</option>
            <option>Mousepads</option>
            <option>Monitores</option>
            <option>IEMs</option>
          </select>
        </div>
        <div class="field field--full">
          <span class="label">Mensaje</span>
          <textarea class="textarea" name="message" required placeholder="¿Qué necesitas?"></textarea>
        </div>
        <div class="field field--full">
          <button class="btn btn--primary" type="submit">Enviar</button>
        </div>
      </form>
      <div class="pill" id="contactStatus" style="margin-top: 10px; display: none;"></div>
    </div>
  `;

  const form = qs("#contactForm", target);
  const status = qs("#contactStatus", target);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!status) return;
    status.style.display = "inline-flex";
    status.textContent = "Mensaje listo. (Integración EmailJS/Formspree pendiente)";
    form.reset();
  });
}

