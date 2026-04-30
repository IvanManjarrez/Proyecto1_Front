# PokéDex — Explorador Pokémon 🎮

Proyecto 01 — SPA con Vite + React + React Router + Tailwind CSS.
Tema visual consistente con el **Taller 3** (paleta `#1a1a2e` / `#e94560` / aqua).

## Stack

- **Vite + React 18**
- **React Router v6**
- **Tailwind CSS v3**
- **React Hot Toast**
- **PokéAPI** — `https://pokeapi.co/api/v2/` (pública, sin API key)

## Vistas

| Ruta | Página |
|------|--------|
| `/` | Home / Landing con stats y accesos rápidos por tipo |
| `/explorar` | Grid con búsqueda y filtro por tipo en tiempo real |
| `/detalle/:id` | Detalle por ID: stats, descripción, habilidades |
| `/favoritos` | Favoritos en Context (persisten entre rutas) |
| `/contacto` | Formulario controlado con validación |
| `*` | 404 |

## Paleta (consistente con Taller 3)

| Variable | Valor |
|----------|-------|
| Fondo principal | `#1a1a2e` |
| Fondo card | `#16213e` |
| Fondo oscuro | `#0f172a` |
| Acento | `#e94560` |
| Hover nav | `aqua` |
| Texto secundario | `#777777` / `#aaaaaa` |

## Requisitos cumplidos ✅

- Vite + React + React Router
- 2 fetches: lista (`/pokemon?limit=150`) y detalle por ID (`/pokemon/:id`)
- Estados Loading / Error / Empty visibles
- Búsqueda + filtro por tipo funcional
- Favoritos en `FavoritesContext`
- Formulario controlado con validación y `disabled`
- Toasts con `react-hot-toast`
- `<dialog>` nativo + `useRef` + `showModal()`
- Dark pattern documentado en `ConfirmModal.jsx`
- SVG inline: `PokeballIcon.jsx`
- Tailwind responsive
- Accesibilidad: `alt`, `role`, `aria-label`, `htmlFor`, HTML semántico
- 8+ componentes `.jsx` separados

## Correr el proyecto

```bash
npm install
npm run dev
```

## Deploy en Vercel

1. Subir a GitHub (público)
2. Importar en [vercel.com](https://vercel.com)
3. Build command: `npm run build` | Output: `dist`

> ⚠️ PokéAPI es pública pero tiene rate limiting. Si aparece error, usa el botón "Reintentar".
