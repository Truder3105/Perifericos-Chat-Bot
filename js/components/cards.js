import { escapeHtml } from "../utils/dom.js";
import { priceTag } from "../utils/formatters.js";

export function sectionHeader({ title, subtitle }) {
  return `
    <div class="hero">
      <h2 class="hero__title">${escapeHtml(title)}</h2>
      ${subtitle ? `<p class="hero__subtitle">${escapeHtml(subtitle)}</p>` : ""}
    </div>
  `;
}

export function productCard({ item, rate, onDetailsLabel = "Ver" }) {
  const p = priceTag({ usd: item.usd, rate });
  const meta = (item.meta || []).map((m) => `<span class="pill">${escapeHtml(m)}</span>`).join("");
  return `
    <article class="card">
      <div class="card__media" aria-hidden="true"></div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(item.name)}</h3>
        <div class="card__meta">${meta}</div>
        <p class="card__desc">${escapeHtml(item.desc || "")}</p>
      </div>
      <div class="card__footer">
        <div class="price">
          <span class="price__main">${escapeHtml(p.cop)}</span>
          <span class="price__sub">${escapeHtml(p.usd)} · tasa ${escapeHtml(String(rate))}</span>
        </div>
        <button class="btn btn--ghost" type="button" data-details="${escapeHtml(item.id)}">
          ${escapeHtml(onDetailsLabel)}
        </button>
      </div>
    </article>
  `;
}

export function instructorCard({ instructor }) {
  return `
    <div class="section section--instructores">
      <div class="instructor">
        <div class="instructor__avatar" aria-hidden="true"></div>
        <div>
          <h3 class="instructor__name">${escapeHtml(instructor.name)}</h3>
          <div class="instructor__meta">
            <div><span class="mono">C.C.</span> ${escapeHtml(instructor.cc)}</div>
            <div><span class="mono">Tel</span> ${escapeHtml(instructor.tel)}</div>
            <div>${escapeHtml(instructor.email)}</div>
          </div>
          ${instructor.bio ? `<p class="hero__subtitle">${escapeHtml(instructor.bio)}</p>` : ""}
        </div>
      </div>
    </div>
  `;
}

