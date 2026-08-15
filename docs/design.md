# Sistema de Diseño

Decisiones estéticas, tokens, tipografía y principios del portafolio.

## Estética

**"Stealth Wealth Técnico"**

El portafolio de alguien que ya llegó. No necesita gritar, decorar, ni convencer.
La tipografía limpia, el espacio en blanco y el silencio visual son el lujo.

Referentes:
- Maison Margiela — deconstrucción, austeridad, intención
- Golden Goose — lujo discreto, textura sobre brillo
- Porsche — ingeniería como diseño, precisión sin exceso
- Editoriales de Bali / Ibiza — naturaleza, calm, premium sin ostentación

## Micro-Interacciones (GSAP)

Las animaciones separan un sitio web promedio de uno de lujo. 

### Reglas de Animación
- **Curvas de Easing**: Usamos siempre curvas fluidas y cinemáticas, principalmente `expo.out` o `power3.inOut`. NUNCA `bounce` o animaciones lineales.
- **Split Text**: La tipografía de título no debe "aparecer" en bloque. Debe formarse de manera fluida (letra por letra o palabra por palabra) con ligeros staggers y traslaciones, usando `src/scripts/splitText.ts`.
- **Hover States**: Los botones (`hover-fill`) tienen un efecto magnético de relleno cuadrado y suave controlado por GSAP, asegurando que la entrada y la salida del cursor generen la misma fluidez independientemente de la velocidad del usuario.
- **Transiciones SPA**: La navegación entre páginas está envuelta en el `ClientRouter` de Astro. No hay pantallas blancas de carga; todo es inmersivo y preserva el estado visual y la memoria de las animaciones.

## Tokens CSS

Definidos en `src/layouts/Base.astro` como variables globales.

```css
:root {
  --dark:        #1c1917;   /* Fondo base — negro cálido */
  --dark-mid:    #332E29;   /* Fondo del shader */
  --bone:        #d6cfc6;   /* Texto secundario */
  --bone-light:  #ede9e4;   /* Texto principal */
  --taupe:       #8c8078;   /* Texto de apoyo, líneas sutiles */
  --ecru:        #a89e94;   /* Descriptores, párrafos de apoyo */
}
```

## Tipografía

**Familia:** `'Helvetica Neue', Helvetica, Arial, sans-serif`

| Uso | Peso | Tamaño | Letter-spacing |
|---|---|---|---|
| Nombre / Display | 200 | `clamp(2.4rem, 5.8vw, 6rem)` | `-0.03em` |
| Headings de sección | 200 | `clamp(2rem, 4vw, 3.5rem)` | `-0.02em` |
| Nav links | 300 | `0.62rem` | `0.22em` |
| Descriptores | 300 | `0.58rem` | `0.30em` |
| CTA texto | 400 | `0.62rem` | `0.22em` |
| Body / párrafos | 300 | `0.85rem` | normal |

## Principios UI

1. **Sin bordes decorativos** — los botones son texto puro. La tipografía es el diseño.
2. **Sin redondeos** — cero `border-radius`. Geometría limpia.
3. **Sin sombras** — el depth viene del shader, no del CSS.
4. **Sin colores de acento** — solo la paleta nude/bone. Nada de azul tech.
5. **Espacio generoso** — el vacío es intencional. No llenar por llenar.
6. **Mayúsculas espaciadas** — todo en `text-transform: uppercase` con `letter-spacing: 0.22em`.

## Animaciones

```css
/* Reveal — entrada editorial */
animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;

@keyframes reveal {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Nada de bounces, nada de flips, nada de pulsos. Solo revelación limpia.

## Navbar — comportamiento de scroll

- **Sobre el hero:** `background: transparent`
- **Al scroll (>40px):** `background: rgba(20, 17, 15, 0.75)` + `backdrop-filter: blur(18px)`
- **Transición:** `0.5s ease`

## Paleta del Shader

El shader usa una paleta independiente definida directamente en GLSL:

```glsl
colorBase      = vec3(0.20, 0.18, 0.16)  /* Taupe oscuro — fondo */
albedoShadow   = vec3(0.65, 0.58, 0.52)  /* Arcilla apagada */
albedoMid      = vec3(0.86, 0.81, 0.75)  /* Nude / lino natural */
albedoHighlight= vec3(0.96, 0.94, 0.92)  /* Bone white / yeso */
```
