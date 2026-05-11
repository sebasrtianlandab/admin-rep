import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, input, model, signal, TemplateRef } from '@angular/core';
import type { RepBadgeVariant } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepEmptyStateComponent } from '@shared/ui/feedback/rep-empty-state/rep-empty-state.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepSkeletonComponent } from '@shared/ui/primitives/rep-skeleton/rep-skeleton.component';
import {
  compareRepCellValues,
  RepTableColumn,
  RepTableRow,
} from './rep-data-table.models';

@Component({
  selector: 'app-rep-data-table',
  imports: [
    NgTemplateOutlet,
    RepSkeletonComponent,
    RepEmptyStateComponent,
    RepBadgeComponent,
    RepButtonComponent,
    RepIconsModule,
  ],
  templateUrl: './rep-data-table.component.html',
  styleUrl: './rep-data-table.component.scss',
})
export class RepDataTableComponent {
  readonly columns = input<RepTableColumn[]>([]);
  readonly rows = input<RepTableRow[]>([]);
  readonly loading = input(false);
  /** Filas esqueleto durante carga. */
  readonly loadingRows = input(5);

  readonly loadingIndices = computed(() =>
    Array.from({ length: Math.max(0, this.loadingRows()) }, (_, i) => i),
  );
  readonly emptyMessage = input('Sin registros.');
  readonly emptyDescription = input<string | null>(null);
  /** `filtered`: copy orientado a búsqueda/filtros sin resultados. */
  readonly emptyMode = input<'empty' | 'filtered'>('empty');
  readonly stickyHeader = input(true);
  /** @deprecated Prefer `density`. */
  readonly compact = input(false);
  /** `comfortable` = densidad ERP por defecto; `compact` más densa. */
  readonly density = input<'compact' | 'comfortable' | null>(null);
  readonly rowActions = input<TemplateRef<{ $implicit: RepTableRow; index: number }> | null>(
    null,
  );

  readonly paginationEnabled = input(false);
  readonly pageSize = input(10);
  readonly pageIndex = model(0);

  private readonly sortKey = signal<string | null>(null);
  private readonly sortDir = signal<'asc' | 'desc'>('asc');

  readonly isCompact = computed(() => {
    const d = this.density();
    if (d === 'compact') return true;
    if (d === 'comfortable') return false;
    return this.compact();
  });

  readonly sortedRows = computed(() => {
    const cols = this.columns();
    const rows = [...this.rows()];
    const key = this.sortKey();
    if (!key) return rows;
    const col = cols.find((c) => c.key === key);
    if (!col?.sortable) return rows;
    const dir = this.sortDir();
    rows.sort((a, b) => compareRepCellValues(a[key], b[key], dir));
    return rows;
  });

  readonly maxPageIndex = computed(() => {
    const total = this.sortedRows().length;
    const ps = Math.max(1, this.pageSize());
    return Math.max(0, Math.ceil(total / ps) - 1);
  });

  readonly effectivePageIndex = computed(() =>
    Math.min(this.pageIndex(), this.maxPageIndex()),
  );

  readonly pagedRows = computed(() => {
    const all = this.sortedRows();
    if (!this.paginationEnabled()) return all;
    const ps = Math.max(1, this.pageSize());
    const pi = this.effectivePageIndex();
    const start = pi * ps;
    return all.slice(start, start + ps);
  });

  readonly rangeLabel = computed(() => {
    const all = this.sortedRows().length;
    if (!this.paginationEnabled() || all === 0) return '';
    const ps = Math.max(1, this.pageSize());
    const pi = this.effectivePageIndex();
    const from = pi * ps + 1;
    const to = Math.min(all, (pi + 1) * ps);
    return `${from}–${to} de ${all}`;
  });

  constructor() {
    effect(() => {
      const max = this.maxPageIndex();
      if (this.pageIndex() > max) {
        this.pageIndex.set(max);
      }
    });
  }

  cellText(row: RepTableRow, key: string): string {
    const v = row[key];
    if (v == null) return '';
    return String(v);
  }

  badgeVariantFor(col: RepTableColumn, row: RepTableRow): RepBadgeVariant {
    const raw = this.cellText(row, col.key);
    return col.badgeVariantByValue?.[raw] ?? col.badgeVariant ?? 'neutral';
  }

  sortStateFor(col: RepTableColumn): 'none' | 'asc' | 'desc' {
    if (this.sortKey() !== col.key) return 'none';
    return this.sortDir();
  }

  toggleSort(col: RepTableColumn): void {
    if (!col.sortable) return;
    if (this.sortKey() !== col.key) {
      this.sortKey.set(col.key);
      this.sortDir.set('asc');
      return;
    }
    if (this.sortDir() === 'asc') {
      this.sortDir.set('desc');
      return;
    }
    this.sortKey.set(null);
  }

  prevPage(): void {
    this.pageIndex.update((i) => Math.max(0, i - 1));
  }

  nextPage(): void {
    this.pageIndex.update((i) => Math.min(this.maxPageIndex(), i + 1));
  }

  emptyTitle(): string {
    return this.emptyMode() === 'filtered' ? 'Sin resultados' : 'Sin datos';
  }
}
