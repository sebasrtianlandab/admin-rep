import type { RepBadgeVariant } from '@shared/ui/primitives/rep-badge/rep-badge.component';

export type RepTableColumnAlign = 'left' | 'right' | 'center';

export type RepTableCellType = 'text' | 'badge' | 'actions';

/** Column definition for mock-friendly ERP tables (no backend coupling). */
export interface RepTableColumn {
  key: string;
  label: string;
  align?: RepTableColumnAlign;
  /** CSS width, e.g. `12rem` or `20%` */
  width?: string;
  /** Ellipsis + nowrap for dense grids */
  truncate?: boolean;
  /**
   * Renders cells using `rowActions` template (`$implicit`: row, `index`: row index).
   * When no template is provided, cells render "—".
   */
  actions?: boolean;
  /** Client-side sortable column (mock). */
  sortable?: boolean;
  cellType?: RepTableCellType;
  /** When `cellType === 'badge'`, default variant if no map match */
  badgeVariant?: RepBadgeVariant;
  /** Map cell string value → badge variant */
  badgeVariantByValue?: Partial<Record<string, RepBadgeVariant>>;
}

export type RepTableRow = Record<string, unknown>;

export function compareRepCellValues(a: unknown, b: unknown, dir: 'asc' | 'desc'): number {
  const mul = dir === 'asc' ? 1 : -1;
  if (a == null && b == null) return 0;
  if (a == null) return -1 * mul;
  if (b == null) return 1 * mul;
  if (typeof a === 'number' && typeof b === 'number') {
    return (a - b) * mul;
  }
  const sa = String(a);
  const sb = String(b);
  const n1 = Number.parseFloat(sa);
  const n2 = Number.parseFloat(sb);
  if (
    !Number.isNaN(n1) &&
    !Number.isNaN(n2) &&
    sa.trim() !== '' &&
    sb.trim() !== '' &&
    Number.isFinite(n1) &&
    Number.isFinite(n2) &&
    String(n1) === sa.trim() &&
    String(n2) === sb.trim()
  ) {
    return (n1 - n2) * mul;
  }
  return sa.localeCompare(sb, undefined, { numeric: true, sensitivity: 'base' }) * mul;
}
