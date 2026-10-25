# Sistema de Diseño

Decisiones estéticas, tokens, tipografía y principios del portafolio.

## Estética

**"Lujo vivido, con un toque"**

Cosas buenas que se usan, no que se exhiben. Sale del Pinterest de André: Margiela (Tabi, GATs pintados), Golden Goose, Gucci, RRL, Cartier asomando por una manga de mezclilla rota, Basquiat, cerámica pintada a mano, lucha libre, caballos, lobos.

**La regla del toque: 90 % clásico, 10 % raro.** Cada pieza tiene una base seria (finanzas) y un detalle que nadie más pondría (dev, arte, humor).

- **Composición libre, tipo collage.** Nada de "texto a la izquierda, imagen a la derecha". Las piezas se enciman, van chuecas, flotan en capas con el mouse y muchas se pueden arrastrar.
- **Dibujos propios** (SVG a mano en `src/components/art/`), pintados trazo por trazo con GSAP.
- **Frases duras, no blandas**: *Work hard*, *Play the game*, *i lowkey dgaf anymore*, *Make art, make money*, y las reglas de la casa. Los cuadros conservan su texto en inglés en ambos idiomas.
- **El animal de André es el lobo.**
- **Sin amarillo.** Naranja sí.

## Tipografía (solo dos familias)

| Familia | Rol | Notas |
|---|---|---|
| **Redaction** (`@fontsource/redaction`, `redaction-50`) | Titulares, texto, notas en rojo (itálica) | Serif libre hecha para un proyecto de arte sobre expedientes judiciales. `Redaction 50` es el corte "desgastado" (pixelado): se usa en "Ortega" y como hover (el título se desgasta). |
| **Hubot Sans** (`@fontsource-variable/hubot-sans`) | Etiquetas, datos, frases de cuadros, enunciados en negra | Grotesca de GitHub, variable en peso (200–900) y ancho (75–125 %). Negra condensada (`900`, `font-stretch: 75%`) = la letra de las frases y etiquetas de ropa. Minúsculas negras rojas = "creative director of my life" ("let's talk." del footer). |

Tokens en `Base.astro`: `--f-serif`, `--f-worn`, `--f-grot` y los roles `--f-display`, `--f-text`, `--f-mono` (etiquetas → Hubot), `--f-pen` (notas → Redaction itálica), `--f-brush` (frases → Hubot negra).

No se usan fuentes manuscritas: la mano la ponen los dibujos y la pluma roja (SVG).

## Paleta

```css
--papel: #F4F2ED;  --hoja: #FBFAF7;  --tinta: #191713;  --grafito: #5F5A52;  --linea: #D9D4CA;
--rojo:  #B3261C;  /* pluma roja del analista */
--azul:  #25437D;  /* rayas oxford, mar */
--pint-naranja / --pint-1..4  /* naranjas para pintura (sin amarillo) */
--verde: #56704A;  --cielo: #9DB8D8;  --cognac: #7A4A2A;
```

Papel y tinta hacen casi todo; rojo y azul van poco y con intención. El footer es tinta (`#15130F`).

## Piezas compartidas (prefijo `lv-`, globales en `Base.astro`)

`lv-kicker`, `lv-fig` (etiquetas), `lv-h2`, `lv-line` (máscara para revelar líneas), `lv-pen-note`, `lv-btn`, `lv-link`, `lv-sheet` + `lv-tape` (hoja con cinta), `lv-rule`, `lv-art*`, `lv-perforado` (estampilla), `lv-nota` (`--negra`, `--roja`), `lv-prose` (texto largo), `lv-pen-circle` / `lv-pen-under` (los inyecta `ink.ts`).

## Movimiento (todo imita un gesto sobre papel)

Vive en `src/scripts/ink.ts` y se declara con atributos:

| Atributo | Efecto |
|---|---|
| `data-pen` / `="under"` | La pluma roja encierra o subraya al pasar el cursor. `aria-current="page"` o `data-pen-on` lo deja trazado; `data-pen-scroll` lo traza al entrar. |
| `data-draw` (`load` · `scroll` · `manual`) | El SVG se pinta trazo por trazo (`data-s`), luego rellenos (`data-fill`) y detalles (`data-pop`). |
| `data-reveal` | `lines` (sube desde su máscara) · `fade` · `rule` (línea con regla) · `sheet` (hoja que cae y se pega la cinta) · `drop` (pieza que se deja caer sobre la mesa) · `type` (máquina de escribir) · `write` (se escribe de izquierda a derecha). |
| `data-count` | Número que cuenta desde cero. |
| `data-drag` | Pieza arrastrable con inercia (GSAP Draggable). |
| `data-depth` (dentro de `data-collage`) | Capa que flota con el mouse. |
| `data-parallax` | Deriva vertical con el scroll. |

Curvas: `expo.out` por defecto, `power3.inOut` para líneas. Nada de rebotes. Scroll con inercia: Lenis (`src/scripts/smooth.ts`). Con `prefers-reduced-motion` todo aparece en su estado final y Lenis no se activa.

Los estados iniciales ocultos viven en CSS bajo `@media (scripting: enabled)` hasta que el elemento recibe `.is-ready` (con failsafe a los 3 s).

## Detalles únicos

- **Etiqueta roja** (`Etiqueta.astro`) como marca, estilo label de ropa; la versión completa lleva la numeración 0–23 de Margiela con la página actual encerrada.
- **Navbar**: la etiqueta roja cosida como marca y el botón Índice como etiqueta colgante con ojal (se mece). El **índice a pantalla completa** se abre con una gota de tinta y es un cuadro: lino, trozos de pintura con lobo y "BUILT, NOT BOUGHT©", las secciones en Redaction gigante y notas a barra de óleo que se escriben al abrir.
- **Holdings** en scroll horizontal fijado; cada proyecto es una lámina.
- **Footer**: "let's talk." (igual en ambos idiomas) sobre un fondo que se pinta: manchas orgánicas, latigazos y escurrimientos con el cursor (`splatter.ts`), como los GATs pintados.
- **Títulos que se desgastan** al pasar el cursor (Redaction → Redaction 50).
- **Journal** como primera plana de periódico ("DIARIO"): los memos cuelgan como cuadros del mismo tamaño (clavo y alambre, marco negro/nogal/roble), chuecos, y se enderezan al pasar el cursor; abajo, su cédula de museo. Suscripción con paloma mensajera y sello.

## Cuadros (pinturas)

Las portadas de los memos son pinturas propias a lo neoexpresionista (Basquiat, el tablero "art" de André): lino crudo o gesso, 2–3 bloques de color con `#pintura`, chorreados, un motivo crudo del tema con contorno negro, palabras a barra de óleo (`mano.ts`) con tachones y ©, rejillas, estrellas de precio y parches de papel. Cada una se relaciona con su memo. Lienzo 400×500. Las palabras van en inglés en ambos idiomas. A André le encantaron: es la referencia para cualquier cuadro nuevo (ver el agente `pintor-portadas`).
