import { instructorCard, sectionHeader } from "../components/cards.js";
import { INSTRUCTORES } from "../data/instructores.data.js";

export function initInstructores(root) {
  const target = root.querySelector("[data-instructores]");
  if (!target) return;

  const main = INSTRUCTORES[0];

  target.innerHTML = `
    ${sectionHeader({
      title: "Instructores",
      subtitle: "Perfil principal del curso.",
    })}
    ${main ? instructorCard({ instructor: main }) : ""}
  `;
}

