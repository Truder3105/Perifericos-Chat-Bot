# PeriféricosPRO — Landing SPA (HTML/CSS/JS)

Landing page estilo SPA (router por hash) para periféricos competitivos de alto rendimiento: mouse, teclados Hall Effect, mousepads, monitores e IEMs. Incluye un widget de chatbot con Gemini (opcional).

## Estructura

- `index.html`: entry point
- `pages/`: parciales HTML cargados por el router
- `js/`: router, secciones, datos, componentes
- `css/`: tokens, layout, componentes y secciones

## Cómo ejecutar

Sirve la carpeta `perifericos-landing/` con un servidor estático.

Ejemplos:

- VS Code / Cursor: extensión “Live Server” apuntando a `perifericos-landing/index.html`
- Python:
  - `python -m http.server 5500` dentro de `perifericos-landing/`

Luego abre `http://localhost:5500/` y navega con el menú.

## Variables de entorno (chatbot)

En un sitio estático el navegador **no puede leer `.env`** directamente. Esta implementación soporta:

- `localStorage` (recomendado para pruebas): la app puede guardar la API key en el navegador.
- `env.json` (opcional): si publicas un archivo `env.json` en la raíz del sitio, la app lo intenta cargar. **No subas secretos** a producción.

El ejemplo de variables está en `.env.example`.
