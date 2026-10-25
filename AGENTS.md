# André Valle Ortega — Portafolio

André es financiero y dev (Cord, Flouvia). El sitio tiene que ser serio pero no rígido: **"Lujo vivido, con un toque"**, sacado de su Pinterest (Margiela, Golden Goose, Gucci, RRL, Basquiat, cerámica pintada, lucha libre, caballos, lobos).

## Golden Rules (Aesthetics & Code)
1. **Lujo vivido, con un toque**: 90 % clásico (finanzas), 10 % raro (dev, arte, humor). Cada pieza tiene una base seria y un detalle que nadie más pondría. Ver `docs/design.md`.
2. **Composición libre, tipo collage**: nada de "texto a la izquierda, imagen a la derecha", nada de plantillas. Piezas encimadas, chuecas, arrastrables, en capas. Cada página es única (los casos Cord y Flouvia tienen página propia, no plantilla).
3. **Dibujos propios** en SVG (`src/components/art/`), hechos a mano trazo por trazo. **No repetir el mismo dibujo ni la misma marca entre páginas.** Si falta un dibujo, se dibuja uno nuevo; no se usan imágenes de stock ni íconos.
4. **Solo dos fuentes**: Redaction (+ Redaction 50, el corte desgastado) y Hubot Sans. Sin fuentes manuscritas, sin Google Fonts. Lo "a mano" lo ponen los SVG (pluma roja, `mano.ts`).
5. **Paleta**: papel, tinta, rojo, azul, naranja (+ verde olivo, cielo, cognac, grana). **Nada de amarillo** (si una bandera o referencia lo lleva, sale naranja). Radios solo de 2px en botones.
6. **Movimiento con propósito**: GSAP con `expo.out` (líneas `power3.inOut`), declarado con atributos (`data-reveal`, `data-draw`, `data-pen`…) en `src/scripts/ink.ts`. Todo imita un gesto sobre papel. Respetar `prefers-reduced-motion`.
7. **Frases duras**, no blandas: *Work hard*, *Play the game*, *i lowkey dgaf anymore*, *Ship it*, *Build without asking*. Nada que suene cursi. El animal de André es el **lobo**.
8. **Código artesanal**: CSS vanilla con tokens en `Base.astro`, piezas compartidas con prefijo `lv-`, estilos scoped por componente. Nada de UI libs, Tailwind, React ni three.js.

## Cómo funciona la estética

### Superficies y tipografía
- Fondo `--papel #F4F2ED`, hojas `--hoja #FBFAF7`, texto `--tinta #191713`, secundario `--grafito`, líneas `--linea`. Rojo `--rojo #B3261C` = la pluma del analista (subraya, encierra, notas). Azul `--azul #25437D` poco y con intención. Footer en tinta.
- Pintura de cuadros: `--pint-naranja`/`--pint-1..4`, `--verde`, `--cielo`, `--cognac`, `--grana`, `--tinta-fija` (negro que no cambia con la superficie).
- **Redaction**: titulares, texto largo, notas rojas en itálica (`--f-pen`). Al pasar el cursor, los títulos se desgastan a Redaction 50.
- **Hubot Sans**: etiquetas, datos, kickers. En negra condensada (`900`, `font-stretch: 75%`) es la voz de las etiquetas de ropa y los titulares gigantes ("DIARIO", "let's talk.").

### Composición
- `home/Pieza.astro` coloca cualquier cosa libre dentro de un contenedor `data-collage`: `x`/`y` en %, `w` en vw, `r`, `z`, `depth` (flota con el mouse), `drag`, `parallax`, versiones móviles `mx/my/mw/mr` y `hideMobile`.
- `home/Obra.astro` cuelga una pieza con cédula (`frame` · `sheet` · `stamp` · `bare`).
- Piezas globales `lv-*` en `Base.astro`: `lv-kicker`, `lv-fig`, `lv-line` (máscara para revelar), `lv-sheet` + `lv-tape` (hoja con cinta), `lv-btn`, `lv-link`, `lv-pen-note`, `lv-perforado` (estampilla), `lv-nota`, `lv-rule`, `lv-prose` (texto largo, ~70 caracteres), `lv-art`, `lv-art-red`, `lv-art-red-fill`.

### Dibujos (`src/components/art/`)
- Todos aceptan `draw` (`load` · `scroll` · `manual` · `none`), `delay`, `label`, `class`. Convención interna: trazos con `data-s`, rellenos con `data-fill`, detalles con `data-pop`; `ink.ts` los pinta en ese orden.
- Filtros compartidos en `InkDefs.astro` (montado una vez en `Base`): `#ink` (pincel), `#ink-fino` (pluma), `#pintura` (acrílico arrastrado), `#brocha` (letras a brocha), `#acuarela`, `#sello-f` (sello de goma). Las regiones de filtro son amplias a propósito para no recortar trazos gruesos.
- En atributos SVG, los tokens van en `style="fill: var(--x)"`; `currentColor` + `lv-art-red` para el rojo.
- **Cuadros de portada de los memos** (`CuadroBootstrap`, `CuadroFriccion`, `CuadroChurn`): pinturas neoexpresionistas a lo Basquiat sobre lino crudo, con bloques de pintura (`#pintura`), chorreados, palabras a barra de óleo, tachones, ©, rejillas, cabezas crudas y parches de papel. Cada uno se relaciona con el tema de su memo. A André **le encantaron**: es la referencia para cualquier "cuadro" nuevo.
- **`mano.ts`**: letra de palo a mano para escribir sobre los cuadros (mayúsculas de un solo trazo, cada letra chueca). `escribir(texto, x, y, { size, tilt, seed })` devuelve el `d` de un `<path>` que se dibuja con `data-s`. No es una fuente.

### Movimiento (`src/scripts/ink.ts`)
| Atributo | Efecto |
|---|---|
| `data-pen` / `="under"` | La pluma roja encierra o subraya al pasar el cursor (`aria-current="page"` o `data-pen-on` lo deja trazado; `data-pen-scroll` lo traza al entrar) |
| `data-draw` (`load` · `scroll` · `scrub` · `manual`) | El SVG se pinta trazo por trazo; `scrub` avanza con el scroll |
| `data-reveal` | `lines` · `fade` · `rule` · `sheet` (hoja que cae y se pega la cinta) · `drop` · `type` (máquina de escribir) · `write` |
| `data-count`, `data-drag`, `data-depth` (en `data-collage`), `data-parallax` | Contador, arrastre con inercia, capas con el mouse, deriva con el scroll |

Lenis da el scroll con inercia (`smooth.ts`); `splatter.ts` pinta el footer con el cursor. Con `prefers-reduced-motion` todo aparece en su estado final.

## Lo que se hizo (rediseño "Lujo vivido", oct 2026)
- **Navbar**: etiqueta roja de ropa cosida como marca (`Etiqueta`), EN/ES, Contacto a pluma y el botón Índice como etiqueta colgante con ojal que se mece. El índice abre con gota de tinta y es un cuadro sobre lino (`Lienzo`: lobo "NO LEASH", "BUILT, NOT BOUGHT©") con las secciones en Redaction gigante y notas a barra de óleo. A André le gusta mucho; cualquier cambio debe conservar ese espíritu.
- **Home**: portada collage ("André / VALLE / Ortega", lobo, etiqueta roja "i lowkey dgaf anymore"), Tesis con KPIs, Holdings en scroll horizontal, la pared tipo salón (Colección: "La manga rota", el as "PLAY THE GAME", The 6, el 911…), Memos.
- **Work**: índice de renglones gigantes; **Cord** (cordón que se dibuja con el scroll, 12 banderas pintadas, timbres fiscales, $5k MRR) y **Flouvia** (carta de servicios, pósters, boceto de Flouvia OS) con páginas propias. Texto en `src/data/cases/`.
- **About**: manifiesto, experiencia, competencias como etiquetas cosidas arrastrables, "Reglas de la casa" pintadas a brocha (`RULES` en `src/data/about.ts`, editable), sus gustos (Barça, Drake/The 6, tequila, café con cigarro, Porsche 911).
- **Journal**: cabecera "DIARIO"; los memos cuelgan como **cuadros** del mismo tamaño (clavo y alambre, marco negro/nogal/roble, la pintura de portada) con cédula de museo; chuecos, se enderezan al pasar el cursor. Suscripción con paloma mensajera y sello. Memos en MDX, en primera persona, ilustrados con `src/components/memo/`.
- **Contacto**: formulario paso a paso tipo Typeform con la estética nueva. **404**: "El lobo se comió esta página."
- **Footer**: "let's talk." (igual en ambos idiomas) sobre pintura que se salpica con el cursor.
- Favicon (lobo crema sobre etiqueta roja) y OG image con los mismos dibujos.

### Lo que André rechazó (no volver a usar)
Amarillo · la mancha azul circular de acuarela · el chorreado tipo peine · el salpicado tipo Pollock · la máscara de luchador · el sello "AVO" · WebGL en el footer · repetir "André Valle Ortega" hasta abajo · frases blandas · el marquee infinito negro · gaps entre secciones del home · el zapato y el plato (dibujos) · un memo "grandote" destacado · el dibujo `Signos` (sol, estrella, pez…) · hojas con cinta para los memos (prefiere cuadros) · ilustraciones "limpias" como portada (prefiere pinturas creativas como su Pinterest).

## Journal: agregar un memo
1. Crear `src/content/journal/<slug>.mdx` (EN) y `es-<slug>.mdx` (ES). Frontmatter: `title`, `date`, `readTime`, `lang`, `draft`, `cover`.
2. `cover` elige la pintura de portada (`bootstrap` · `friccion` · `churn`). Para un tema nuevo, pintar un `Cuadro<Tema>.astro` nuevo (viewBox 400×500, misma técnica) y agregarlo al enum en `src/content.config.ts` y al mapa `covers` de `JournalIndex.astro`.
3. Ilustraciones dentro del texto: componentes de `src/components/memo/` (`Fig`, `Ciclo`, `Tablero`, `Venn`, `Journey`, `Balanza`, `Escala`, `Cuenta`, `Red`, `Ojo`…). Recibe `n` y `caption`, y van al ancho del texto.
4. Tono: experiencia propia de André con Cord y Flouvia, frases directas. No inventar datos de sus empresas.

## Subagentes del proyecto (`.claude/agents/`)
| Agente | Para qué |
|---|---|
| `pintor-portadas` | Pinta los cuadros de portada de los memos (`Cuadro*.astro`, estilo neoexpresionista) |
| `ilustrador-memos` | Diagramas a tinta dentro de los memos (`src/components/memo/`) |
| `escritor-memos` | Escribe los memos en MDX, EN + ES, en primera persona desde Cord y Flouvia |
| `disenador-landing` | Diseño y construcción de secciones y páginas (collage, dibujos, movimiento) |
| `copy-landing` | Copy del sitio en EN/ES con la voz de André (`ui.ts`, `src/data/`) |
| `dibujante-sitio` | Dibujos SVG del sitio fuera de los memos (`src/components/art/`) |
| `revisor-visual` | Revisión antes de un push: check, build, capturas y reglas (no edita) |

Todos verifican con capturas reales: `node tools/shot.mjs <url> <ancho> <alto> <salida> <reduce 0|1> "<objetivo>|||<objetivo>"` (objetivo = scrollY, selector CSS o `js:<código>`; usa Chrome headless y no necesita dependencias).

## Quick Start
- `npm run dev` — Levantar servidor local (Astro dev; los endpoints `/api/*` corren aquí)
- `npm run build` — Compilar para producción
- `npm run check` — Type-check de Astro/TS (debe salir en 0 errores)
- Copia `.env.example` → `.env` y rellena las claves de Resend para probar formularios en local.

**Mañas del dev server:** si un cambio de CSS scoped no aparece, reiniciar `astro dev`. Si cambias el schema o el frontmatter de una colección y no se refleja, borrar `.astro/data-store.json` y `node_modules/.astro/data-store.json` y reiniciar.

## Arquitectura de Deploy

- **Hosting:** Vercel (cuenta Hobby personal de André, proyecto `andre-portafolio`). Dominio de producción: **`https://andrevalle.xyz`** (definido en `astro.config.mjs` → `site`).
- **Render:** el sitio es **estático**. El adapter `@astrojs/vercel` solo convierte en función serverless los archivos con `export const prerender = false` (hoy: `src/pages/api/contact.ts` y `src/pages/api/subscribe.ts`).
- **Deploy:** push a `main` → Vercel construye y publica automáticamente.
- **Autor del commit:** debe ser `andrevalleo13 <andrevalleo13@gmail.com>`. Con `hola@flouvia.com`, Vercel Hobby bloquea el deploy ("Deployment was blocked"). Para confirmar un deploy: `curl https://api.github.com/repos/andrevalleo13/Andre-Portafolio/commits/<sha>/status`.

## Backend / Formularios (Resend)

- `src/lib/resend.ts` — cliente Resend + validación + helper JSON. Solo server-side; lee de `import.meta.env`.
- `src/emails/` — plantillas de correo **puras** (sin env ni red; reciben datos → devuelven `{ subject, html, text }`). Table-based, estilos inline, sin web fonts: la estética "carbón" del sitio (`#1c1917`, hueso, Helvetica Neue thin, hairlines). Reutilizables por endpoints y scripts.
  - `layout.ts` — `emailShell()` + helpers (`field`, `hairline`, `escapeHtml`) y tokens `EMAIL`.
  - `contact-notification.ts` — el correo que le llega a André desde el formulario.
- **`POST /api/contact`** — formulario de contacto (`TypeformContact.astro`). Envía email transaccional (HTML + texto) a `RESEND_CONTACT_TO` con `replyTo` del remitente. **No** es marketing.
- **`POST /api/subscribe`** — newsletter (`Newsletter.astro`). Alta en la audiencia de marketing (`RESEND_AUDIENCE_ID`) con `unsubscribed: false`.
- **Audiencias en Resend:** `Newsletter` = única lista de marketing (broadcasts). `Leads · Formulario` (opcional, `RESEND_LEADS_AUDIENCE_ID`) = registro de quien usa el form de contacto, siempre `unsubscribed: true`.
- **Variables de entorno** (Vercel + `.env` local): `RESEND_API_KEY` (Full access), `RESEND_FROM` (dominio verificado), `RESEND_CONTACT_TO`, `RESEND_AUDIENCE_ID`, `RESEND_LEADS_AUDIENCE_ID` (opcional). Ver `.env.example`.
- **DNS / deliverability:** `andrevalle.xyz` verificado en Resend (SPF + DKIM). DMARC activo: `TXT _dmarc.andrevalle.xyz` = `v=DMARC1; p=none; rua=mailto:andrevalleo13@gmail.com`. Los correos nuevos que caigan en spam: "no es spam" + agregar el `from` a contactos (patrón dominio-propio→Gmail).

## Contenido editable
- Textos de interfaz EN/ES: `src/i18n/ui.ts`.
- About (experiencia, formación, competencias, reglas de la casa): `src/data/about.ts`.
- Casos: `src/data/cases/cord.ts`, `src/data/cases/flouvia.ts`.
- Memos: `src/content/journal/*.mdx`.

## Índice de Documentación Extensa

Toda la documentación técnica profunda del proyecto vive en `docs/`. Cada tema tiene su propio archivo.

| Archivo | Contenido |
|---|---|
| [estructura.md](./docs/estructura.md) | Árbol de archivos y organización del proyecto |
| [stack.md](./docs/stack.md) | Tecnologías, dependencias y configuración |
| [design.md](./docs/design.md) | Sistema de diseño — estética, tokens, tipografía, principios |
| [i18n.md](./docs/i18n.md) | Sistema de internacionalización EN/ES |
| [components.md](./docs/components.md) | Documentación de cada componente |
| [pages.md](./docs/pages.md) | Estado y descripción de cada página |
| [changelog.md](./docs/changelog.md) | Historial de cambios cronológico |
