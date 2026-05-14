# PeriféricosPRO — Landing SPA (HTML/CSS/JS)

Landing page estilo SPA (router por hash) para periféricos competitivos de alto rendimiento: mouse, teclados Hall Effect, mousepads, monitores e IEMs. Incluye un widget de chatbot con Gemini (opcional).

## Tecnologías utilizadas

- **HTML5**: estructura y punto de entrada (`index.html`).
- **CSS3**: diseño por capas (`css/`: variables, reset, layout, componentes y estilos por sección).
- **JavaScript (ES modules)**: lógica en el cliente, sin framework (`js/`).
- **Fetch API**: carga de parciales HTML y llamadas a la API de Gemini.
- **Google Gemini API** (opcional): generación de respuestas del chatbot vía Generative Language API.

## Arquitectura general

- **SPA por hash**: la URL usa fragmentos (`#home`, `#mouse`, etc.). `js/router.js` escucha `hashchange`, carga el HTML correspondiente desde `pages/` y lo inserta en `#app`.
- **Capa de presentación**: `pages/*.html` son contenedores mínimos; `js/sections/*.js` rellena cada vista con datos de `js/data/*.js`.
- **Componentes reutilizables**: menú (`navbar.js`), tarjetas/modales (`cards.js`, `modal.js`), chatbot (`chatbot.js`).
- **Estilos**: `css/main.css` importa tokens, layout, componentes y secciones para mantener el diseño coherente.
- **Chatbot**: `js/utils/gemini.js` lista modelos disponibles para la key; `geminiErrors.js` unifica mensajes de error legibles. La key puede venir de `localStorage` o de `env.json` (ver variables más abajo).

## Estructura

- `index.html`: entry point
- `pages/`: parciales HTML cargados por el router
- `js/`: router, secciones, datos, componentes
- `css/`: tokens, layout, componentes y secciones

## Instrucciones de ejecución

1. Clona o copia el proyecto y entra en la carpeta `perifericos-landing/`.
2. Levanta un **servidor HTTP estático** en esa carpeta (el router usa `fetch` a `pages/*.html`; abrir solo el archivo con `file://` suele fallar por CORS o rutas).
3. Abre en el navegador la URL que indique el servidor (por ejemplo `http://localhost:5500/`).
4. Navega con el menú lateral; para el chatbot, pulsa **Chat** y, si usas Gemini, configura la key con `/key TU_API_KEY` (o usa `env.json` / variables documentadas abajo).

## Cómo ejecutar

Sirve la carpeta `perifericos-landing/` con un servidor estático.

Ejemplos:

- VS Code / Cursor: extensión “Live Server” apuntando a `perifericos-landing/index.html`
- Python:
  - `python -m http.server 5500` dentro de `perifericos-landing/`

Luego abre `http://localhost:5500/` y navega con el menú.

## Variables de entorno necesarias

Referencia de nombres (valores de ejemplo en `.env.example`). En **producción** no subas claves al repositorio.

| Variable | Descripción |
|----------|-------------|
| `GEMINI_API_KEY` | Clave de Google AI Studio para llamar a Gemini desde el chatbot. |
| `GEMINI_MODEL` | Modelo preferido (p. ej. `gemini-2.0-flash`). La app puede elegir otro compatible si ListModels lo permite. |
| `GEMINI_API_URL` | Base de la API (por defecto `https://generativelanguage.googleapis.com/v1beta/models`). |
| `SITE_NAME` | Nombre del sitio (config). |
| `SITE_LANG` | Idioma/locale (config). |
| `DEFAULT_CURRENCY` | Moneda principal (p. ej. COP). |
| `SECONDARY_CURRENCY` | Moneda secundaria (p. ej. USD). |
| `USD_TO_COP_RATE` | Tasa para convertir USD → COP en precios mostrados. |

**Nota:** el navegador no lee `.env` solo. Para desarrollo local puedes copiar valores a `env.json` (mismas claves) en la raíz de `perifericos-landing/` o usar `/key` en el chat para guardar la API key en `localStorage`.

## Variables de entorno (chatbot)

En un sitio estático el navegador **no puede leer `.env`** directamente. Esta implementación soporta:

- `localStorage` (recomendado para pruebas): la app puede guardar la API key en el navegador.
- `env.json` (opcional): si publicas un archivo `env.json` en la raíz del sitio, la app lo intenta cargar. **No subas secretos** a producción.

El ejemplo de variables está en `.env.example`.
