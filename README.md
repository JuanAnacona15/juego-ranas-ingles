# 🐸 SAPO RACE — Aventura por Colombia

Videojuego educativo de inglés para dos jugadores locales: dos ranas corren por hojas
flotantes de un estanque tropical respondiendo preguntas de gramática inglesa, mientras
descubres los anfibios de Colombia.

- **Sin backend, sin internet**: todo corre en el navegador tras cargar los recursos.
- **Tecnologías**: React + Vite, JavaScript (ES6+), CSS puro, SVG, LocalStorage.

---

## ▶️ Instalación y ejecución

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5173)
```

Versión de producción:

```bash
npm run build      # genera la carpeta dist/
npm run preview    # sirve dist/ en local
```

Pruebas automatizadas (Vitest):

```bash
npm test
```

Para jugar **sin conexión**, abre el `index.html` de `dist/` servido por cualquier
servidor estático (o usa `npm run preview`).

---

## 🗂️ Estructura

```
src/
├── components/     # FrogCard, LilyPad, GameBoard, QuestionCard, PlayerStatus
├── screens/        # Home, CharacterSelect, DifficultySelect, Game, Instructions, Settings, Results
├── data/
│   ├── frogs.js    # 10 especies reales de anfibios de Colombia
│   └── questions.js# banco de 120 preguntas (30 fáciles, 40 medias, 50 difíciles)
├── game/
│   ├── gameLogic.js    # funciones puras (pista, mazo, movimiento, efectos)
│   └── gameReducer.js  # estado central de la partida (useReducer)
├── styles/main.css     # estilos, animaciones y diseño responsivo
├── App.jsx
└── main.jsx
```

---

## ✏️ Cómo modificar el contenido

### Cambiar o añadir preguntas

Edita `src/data/questions.js`. Cada pregunta se crea con la función auxiliar `q`:

```js
q("easy_031", "easy", "simple_present",
  "She ___ to school.",          // enunciado (en inglés)
  "goes",                        // respuesta correcta
  ["go", "going", "gone"],       // tres opciones incorrectas
  "Con she usamos 'goes'.")      // explicación (en español)
```

- El **id** debe ser único. El **nivel** es `easy`, `medium` o `hard`.
- El **tema** puede ser `simple_present`, `simple_past`, `comparatives`,
  `superlatives` o `vocabulary`.
- La respuesta correcta se coloca sola en una posición variada (la función `q` se
  encarga de mezclarla de forma determinista), así que **no edites el orden a mano**:
  siempre escribe la correcta como cuarto argumento y tres incorrectas como quinto.

### Cambiar las especies (ranas)

Edita `src/data/frogs.js`. Cada especie tiene:

```js
{
  id: "frog_01",
  commonName: "Rana dorada venenosa",
  scientificName: "Phyllobates terribilis",
  habitat: "Bosques húmedos del Pacífico colombiano",
  funFact: "Es uno de los vertebrados más tóxicos del mundo.",
  image: "/assets/frogs/frog_01.svg",
  palette: ["#FFD45C", "#FF914D"],
}
```

Las ilustraciones SVG se generan desde `scripts/generate-assets.mjs`. Si cambias los
colores (campo `palette`) o añades una especie, edita también `FROG_CONFIG` en ese
script y vuelve a generar:

```bash
node scripts/generate-assets.mjs
```

> La información biológica debe ser verificable. Si una especie no está confirmada,
> déjala marcada como pendiente antes de publicarla.

### Cambiar las reglas del juego

Todo el motor está en `src/game/gameLogic.js` (funciones puras, sin UI):

- **`DIFFICULTIES`** — número de hojas y descripción de cada nivel.
- **`generateTrack`** — distribución de hojas (porcentajes de verde/morada/roja/azul/amarilla).
- **`applyMove`** — efecto de cada hoja según el resultado de la respuesta: morada
  retrocede 2 si fallas, roja pierde 2 turnos si fallas, azul da pregunta extra si
  aciertas, amarilla avanza 2 si aciertas.

El flujo de turnos vive en `src/game/gameReducer.js`.

---

## 🎨 Reglas rápidas de las hojas

El efecto de cada hoja se aplica según el resultado de tu respuesta **mientras estás parado sobre ella**:

| Hoja | Si aciertas | Si fallas |
|------|-------------|-----------|
| 🟢 Verde (normal) | Avanzas 1 | Te quedas |
| 🟣 Morada (trampa) | Avanzas 1 | Retrocedes 2 |
| 🔴 Roja (penalización) | Avanzas 1 | Te quedas y pierdes 2 turnos |
| 🔵 Azul (bonus) | Avanzas 1 + pregunta extra | Te quedas |
| 🟡 Amarilla (impulso) | Avanzas 2 | Te quedas |

La meta siempre es verde. La casilla inicial no tiene efecto.

---

## ✅ Verificación

```bash
npm test    # 30 pruebas de la lógica (motor, efectos, turnos, datos)
npm run build
node scripts/smoke-render.mjs   # renderiza todas las pantallas sin errores
```

---

Créditos: proyecto educativo sobre biodiversidad colombiana e inglés básico.
Las especies citadas corresponden a anfibios reales presentes en Colombia
(fuentes: IUCN Red List, AmphibiaWeb).
