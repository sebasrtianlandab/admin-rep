import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, model, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type { ParametersCatalogItem } from '@features/parameters/domain/parameters-sections.models';
import { RepDataTableComponent } from '@shared/ui/composite/rep-data-table/rep-data-table.component';
import type { RepTableColumn, RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { RepFilterBarComponent } from '@shared/ui/composite/rep-filter-bar/rep-filter-bar.component';
import { RepTableToolbarComponent } from '@shared/ui/composite/rep-table-toolbar/rep-table-toolbar.component';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepInputComponent } from '@shared/ui/primitives/rep-input/rep-input.component';
import { RepSelectComponent, type RepSelectOption } from '@shared/ui/primitives/rep-select/rep-select.component';
import { RepTextareaComponent } from '@shared/ui/primitives/rep-textarea/rep-textarea.component';
import { RepSwitchComponent } from '@shared/ui/primitives/rep-switch/rep-switch.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';

@Component({
  selector: 'app-parameters-catalogs-page',
  imports: [
    DatePipe,
    RouterLink,
    RepIconsModule,
    RepDataTableComponent,
    RepFilterBarComponent,
    RepTableToolbarComponent,
    RepBadgeComponent,
    RepButtonComponent,
    RepCardComponent,
    RepInputComponent,
    RepSelectComponent,
    RepTextareaComponent,
    RepSwitchComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepPageHeaderComponent,
    RepErrorStateComponent,
  ],
  templateUrl: './parameters-catalogs-page.component.html',
  styleUrl: './parameters-catalogs-page.component.scss',
})
export class ParametersCatalogsPageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.catalogs;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly search = model('');
  readonly draft = signal<ParametersCatalogItem[] | null>(null);
  readonly selectedId = signal<string | null>(null);

  readonly syncOptions: RepSelectOption[] = [
    { value: 'Manual', label: 'Manual' },
    { value: 'Nocturna', label: 'Nocturna' },
    { value: 'Webhook', label: 'Webhook' },
  ];

  readonly columns: RepTableColumn[] = [
    { key: 'name', label: 'Catálogo', sortable: true, truncate: true },
    { key: 'type', label: 'Tipo', sortable: true },
    { key: 'status', label: 'Estado', cellType: 'badge', badgeVariant: 'neutral', badgeVariantByValue: { Activo: 'success', Borrador: 'warning', Sincronizado: 'info' } },
    { key: 'rows', label: 'Filas', sortable: true, align: 'right' },
    { key: 'source', label: 'Origen', cellType: 'badge', badgeVariant: 'outline' },
    { key: 'lastSync', label: 'Última sync', sortable: true },
    { key: 'actions', label: 'Acciones', actions: true, width: '8rem' },
  ];

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.items) !== JSON.stringify(draft);
  });

  readonly filteredRows = computed<RepTableRow[]>(() => {
    const search = this.search().trim().toLowerCase();
    const items = this.draft() ?? [];
    const filtered = !search
      ? items
      : items.filter((item) =>
          `${item.name} ${item.type} ${item.status}`.toLowerCase().includes(search),
        );
    return filtered.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      status: item.status,
      rows: item.rows,
      source: item.source,
      lastSync: new Date(item.lastSync).toLocaleString(),
    }));
  });

  readonly selected = computed(() => {
    const id = this.selectedId();
    return this.draft()?.find((item) => item.id === id) ?? null;
  });

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.items));
      const current = this.selectedId();
      if (!current || !snapshot.items.some((item) => item.id === current)) {
        this.selectedId.set(snapshot.items[0]?.id ?? null);
      }
    });
  }

  ngOnInit(): void {
    this.facade.loadCatalogs();
  }

  refresh(): void {
    this.facade.loadCatalogs();
  }

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.items));
    this.selectedId.set(snapshot.items[0]?.id ?? null);
  }

  save(): void {
    const items = this.draft();
    if (!items) return;
    this.facade.saveCatalogs(structuredClone(items));
  }

  selectCatalog(id: string): void {
    this.selectedId.set(id);
  }

  patchSelected(patch: Partial<ParametersCatalogItem>): void {
    const id = this.selectedId();
    if (!id) return;
    this.draft.update((items) =>
      items ? items.map((item) => (item.id === id ? { ...item, ...patch } : item)) : items,
    );
  }

  setSyncStrategy(value: string): void {
    if (value === 'Manual' || value === 'Nocturna' || value === 'Webhook') {
      this.patchSelected({ syncStrategy: value });
    }
  }

  onFilterReset(): void {
    this.search.set('');
  }

  asNumber(value: string): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  asText(value: number): string {
    return String(value);
  }

  rowId(row: RepTableRow): string {
    return String(row['id'] ?? '');
  }
}
