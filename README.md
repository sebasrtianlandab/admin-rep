# admin-rep

Panel administrativo (ERP) para **Real Estate Perú**. Frontend en **Angular 19** con **Tailwind CSS v4**, datos **mock** y sin integración al backend en esta fase.

## Requisitos

- Node.js LTS
- npm

**Tailwind v4:** el CLI de Angular usa **`.postcssrc.json`** en la raíz del proyecto para aplicar `@tailwindcss/postcss`. Sin ese archivo, las utilidades (`flex`, `grid`, etc.) no se generan y la app se ve “sin CSS”.

## Estilos globales (`src/styles/`)

Un solo entry en `angular.json`: **`src/styles/styles.scss`**, que importa en orden:

| Archivo | Rol |
|---------|-----|
| `tokens.css` | Variables CSS (REP, sidebar, dark, radius, spacing de página). |
| `tailwind.css` | Tailwind v4 + `@source` hacia `src/app` + `@theme inline` enlazado a tokens. |
| `globals.css` | Base: `html`/`body`/`app-root`, bordes, fuentes, cursores en botones. |
| `utilities.css` | Clases `.rep-*` (layout de página, grillas, tipografía, scroll). |
| `theme.css` | `color-scheme`, transiciones de tema, `::selection`, `prefers-reduced-motion`. |

## Comandos

```bash
npm start          # ng serve — http://localhost:4200
npm run build      # compilación producción
npm test           # unit tests (Karma)
```

## Arquitectura por capas

Cada feature (por ahora solo **dashboard**) sigue:

| Capa              | Carpeta        | Rol |
|-------------------|----------------|-----|
| **Presentation**  | `presentation/` | Componentes de UI, sin lógica de negocio |
| **Application**   | `application/`  | Orquestación, signals, facades |
| **Domain**        | `domain/`       | Modelos, contratos (ports) |
| **Infrastructure**| `infrastructure/` | Repositorios mock; futuro HTTP |

Compartido: `core/` (layout, tema, config), `shared/ui` (componentes reutilizables).

Design system (convenciones, tabla, tokens): **`docs/DESIGN_SYSTEM.md`**.

## Rutas

- `/` → redirección a `/dashboard`
- `/dashboard` — panel de control (lazy)

## Referencia visual

Los tokens de color y tipografía están alineados con la plataforma existente (morado / azul, Lora + Open Sans), con densidad propia de consola administrativa.
