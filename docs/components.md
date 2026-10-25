# Componentes

## Layout y navegación

### `layouts/Base.astro`
`<head>` (SEO, OG, JSON-LD, fuentes), tokens CSS, piezas compartidas `lv-*`, `InkDefs`, `Navbar`, `Footer` e inicialización de scripts. Props: `title`, `description?`.

### `Navbar.astro`
Barra mínima: etiqueta roja (marca) a la izquierda; EN/ES, "Contacto" (pluma roja) y botón "Índice" a la derecha. Papel + línea fina al hacer scroll; se esconde al bajar y vuelve al subir. "Índice" abre una hoja a pantalla completa compuesta como collage (secciones en Redaction gigante, sueltas, con número de etiqueta; la actual en cursiva roja y encerrada). Se abre como gota de tinta (`clip-path`), detiene Lenis, cierra con Escape.

### `Footer.astro`
Fondo tinta que se pinta: al entrar en pantalla caen unas manchas solas y el cursor salpica pintura (`splatter.ts`: gotas orgánicas con brillo, latigazos según la velocidad, escurrimientos, un color por gesto, clic = salpicadura grande, botón "limpiar el lienzo"). Encima: "let's talk." gigante en Hubot negra roja (igual en EN y ES), email, índice con la numeración 0–23 de Margiela y una línea base con `Etiqueta`, redes, © y "volver arriba".

## Páginas compartidas EN/ES

Cada página de `src/pages` (y `src/pages/es`) es un envoltorio de una línea; el contenido vive aquí y saca el idioma de la URL.

| Componente | Página |
|---|---|
| `Home.astro` + `home/*` | `/` |
| `WorkIndex.astro` | `/work` — renglones gigantes; el título se desgasta y el dibujo sigue al cursor |
| `CaseCord.astro` | `/work/cord` — página propia: cordón que se dibuja con el scroll (cotización → firma → cobro → factura), 12 banderas pintadas, flujo del dinero, timbres fiscales, cobranza, terminal + candado, engranes y libro de números. Texto en `src/data/cases/cord.ts` |
| `CaseFlouvia.astro` | `/work/flouvia` — página propia: la carta de servicios, pósters de clientes, boceto de Flouvia OS, el taller y la etiqueta de composición. Texto en `src/data/cases/flouvia.ts` |
| `WorkCase.astro` | `/work/[id]` de cualquier otro proyecto — portada collage, ficha, índice lateral de H2, lote siguiente |
| `About.astro` | `/about` — manifiesto, experiencia, competencias como etiquetas cosidas arrastrables, Debilidades (The 6, tequila y el 911 sueltos, sin lista), formación y certificaciones (datos en `src/data/about.ts`) |
| `JournalIndex.astro` | `/journal` — primera plana: nota principal, recortes, cupón |
| `JournalPost.astro` | `/journal/[slug]` — barra roja de lectura, capitular, memo siguiente |
| `TypeformContact.astro` | `/contact` — formulario paso a paso (nombre → intención → sub-intención → detalles → email → `POST /api/contact`). Guarda avance en localStorage, teclado Enter/A/B/C. El dibujo cambia según la intención. |
| `Newsletter.astro` | Cupón de suscripción (`POST /api/subscribe`) |

## Home (`components/home/`)

| Componente | Qué es |
|---|---|
| `Cover.astro` | Portada collage: "André / VALLE / Ortega" en tres voces, lobo, estampilla, dálmata, etiqueta roja; piezas arrastrables y capas con el mouse |
| `Tesis.astro` | I. Titular escalonado, dos párrafos (serif / grotesca) con subrayados rojos, KPIs que cuentan |
| `Holdings.astro` | II. Scroll horizontal fijado (desktop); cada proyecto es una lámina (composiciones `a` / `b`) |
| `Coleccion.astro` | III. Pared a lo salón con `Obra` arrastrables |
| `Memos.astro` | IV. Lista escalonada de memos |
| `Folio.astro` | Encabezado corrido de catálogo (`Nº II — Holdings · p. 03`) |
| `Pieza.astro` | Coloca algo libre en una composición: `x`, `y` (% del contenedor), `w` (vw), `r`, `z`, versiones móviles `mx/my/mw/mr`, `depth`, `drag`, `parallax`, `hideMobile` |
| `Obra.astro` | Pieza colgada con cédula: `frame` · `sheet` · `stamp` · `bare` |

## Dibujos (`components/art/`)

Todos aceptan `draw` (`load` · `scroll` · `manual` · `none`), `delay`, `label`, `class`.

**Animales y objetos:** `Lobo` (gruñendo, con cadena), `LoboCorona` (cabeza tipo Basquiat), `Caballo`, `CaballoAcuarela`, `CaballosRojos`, `Galope`, `Dalmata`, `Tigre` (naranja con rayas), `Pulpo`, `Sardinas`, `Manga` (reloj de acero asomando por un agujero roto de una manga de suéter), `Reglas` (las reglas de la casa pintadas a brocha), `Reloj`, `Porsche`, `Puro`, `Taza`, `Velero` (Flouvia), `Cuerda` (Cord), `Estampilla`, `Signos`.

**Lo que le gusta a André:** `Barca` (camiseta blaugrana "VALLE 10", sin escudo), `TheSix` (Drake: CN Tower con un 6 naranja), `Cafe` (espresso con cigarro), `Tequila`.

**Para los casos:** `Bandera` (12 países, banderines pintados con las tintas de la casa: el amarillo sale naranja), `Timbre` (sello de goma `circle`/`rect`), `Doodle` (bocetos: cotización, firma, tarjeta, recibo, candado, sobre, calendario, cadena de hashes, flujo, engranes, huacal, lupa, gota, letra, cubo, portal, pin).

**Texto pintado:** `Carta` (as de corazones con "PLAY THE GAME" a crayón), `Pagina` (página de libro con letras rojas), `Reglas`.

**Marcas:** `Trazo` con `kind`: `rojo`, `ocre`, `salpicadura`, `garabato`, `estrella`, `twombly`, `verde`, `puntos`, `rayas`, `sol`, `zigzag`, `espiral`, `tachas`, `cadena`, `estrellas`, `cielo`, `corona`, y las pinturas de fondo `grafiti` y `brochazo` (con `tone`). Van detrás del texto, nunca encima. A André no le gustaron el chorreado tipo peine ni el salpicado tipo Pollock: no volver a usarlos. La pincelada naranja es la firma de la portada; en el resto del sitio se usan otras marcas para no repetir. A André no le gusta la mancha azul circular (`acuarela`): no usarla.

**Marca:** `Etiqueta` (`mini` · `full` con numeración 0–23). **Filtros SVG:** `InkDefs` (`#ink`, `#ink-fino`, `#pintura`, `#acuarela`, `#sello-f`, `#flor`), montado una vez por página.

## Helpers (`src/lib/`)

`work.ts` (orden de lotes, `workSlug`, `getWork`, `workPaths`), `journal.ts` (`getMemos`, `memoHref`, `memoDate`, `excerpt`, `memoPaths`), `resend.ts`.
