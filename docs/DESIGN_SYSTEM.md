# REP Admin — Design System (técnico)

Convenciones para evolucionar `admin-rep` sin romper la arquitectura por capas ni la filosofía standalone.

## Árbol `src/app/shared/ui`

| Carpeta | Uso |
|---------|-----|
| `primitives/` | Controles atómicos (botón, campos, badge, skeleton, spinner, divider, avatar, tooltip). Sin dominio. |
| `composite/` | Patrones UI compuestos (tabla, cabecera de página, toolbar de página, toolbar de tabla, lista de stats, filter bar, confirm dialog). |
| `layout/` | Marco de página (`rep-page-container`, `rep-section`). |
| `feedback/` | Estados vacíos, error, carga. |
| `navigation/` | Migas (`rep-breadcrumb`). |
| `data-display/` | KPIs y métricas (`rep-kpi-card`, `rep-stat-card`). |
| `icons/` | `RepIconsModule` — registrar aquí cualquier icono Lucide usado en shell o DS. |

## Tokens (`src/styles/tokens.css`)

- Preferir variables `--rep-*` (alias semánticos) y escalas existentes (`--spacing-*`, `--shadow-*`, etc.).
- **No** usar hex en SCSS de componentes; usar `var(--primary)`, `var(--rep-danger)`, etc.
- Shell: `--rep-sidebar-width`, `--rep-topbar-height`, `--rep-table-row-height`, `--rep-focus-ring`, `--rep-z-*`.

## Estilos compartidos

- Campos de formulario: `src/styles/_rep-field.scss` importado en `rep-input` / `rep-select` / `rep-textarea`.
- Utilidades globales: `src/styles/utilities.css` (tipografía `.rep-page-title`, layout `.rep-toolbar`, etc.).

## Nuevos módulos ERP (presentación)

1. Página: `app-rep-page-container` + `app-rep-toolbar` + `app-rep-section`.
2. Listados: `app-rep-data-table` + proyección `[repTableToolbar]` / `[repTableHeaderActions]` si aplica.
3. Acciones destructivas: `app-rep-confirm-dialog`.
4. Iconos nuevos: añadirlos a `rep-icons.module.ts` (tree-shaking).

## `rep-data-table`

- **Densidad:** `density`: `'compact' | 'comfortable'`; el input `compact` sigue soportado como compatibilidad.
- **Orden:** columnas con `sortable: true` — orden local cíclico asc → desc → sin orden.
- **Badges:** `cellType: 'badge'` + `badgeVariant` / `badgeVariantByValue`.
- **Acciones:** columna `actions: true` + `rowActions` template.
- **Paginación mock:** `paginationEnabled` + `pageSize` + `pageIndex` (modelo).
- **Vacío / filtros:** `emptyMode`: `'empty' | 'filtered'`.

## Naming

- Selectores BEM con prefijo `rep-` en componentes (`rep-table__th`).
- Selectores de shell con prefijo `app-` (`app-sidebar__link`).

## Build

Tras cambios en el DS: `npx ng build --configuration=development`.
