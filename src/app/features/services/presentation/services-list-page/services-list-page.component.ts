import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, model } from '@angular/core';
import { ServicesFacade } from '@features/services/application/services.facade';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepDataTableComponent } from '@shared/ui/composite/rep-data-table/rep-data-table.component';
import {
  RepTableColumn,
  RepTableRow,
} from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { RepFilterBarComponent } from '@shared/ui/composite/rep-filter-bar/rep-filter-bar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepTableToolbarComponent } from '@shared/ui/composite/rep-table-toolbar/rep-table-toolbar.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';
import { RepKpiCardComponent } from '@shared/ui/data-display/rep-kpi-card/rep-kpi-card.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';

@Component({
  selector: 'app-services-list-page',
  imports: [
    DatePipe,
    RepIconsModule,
    RepPageHeaderComponent,
    RepKpiCardComponent,
    RepCardComponent,
    RepDataTableComponent,
    RepBadgeComponent,
    RepButtonComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepErrorStateComponent,
    RepFilterBarComponent,
    RepTableToolbarComponent,
  ],
  templateUrl: './services-list-page.component.html',
  styleUrl: './services-list-page.component.scss',
})
export class ServicesListPageComponent implements OnInit {
  private readonly facade = inject(ServicesFacade);

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly search = model('');

  readonly columns: RepTableColumn[] = [
    { key: 'ref', label: 'Ref.', sortable: true, width: '7rem' },
    { key: 'title', label: 'Servicio', sortable: true, truncate: true },
    { key: 'professional', label: 'Profesional', width: '7rem' },
    { key: 'category', label: 'Categoría', sortable: true },
    {
      key: 'state',
      label: 'Estado',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: { Activo: 'success', Pausado: 'warning' },
    },
    { key: 'openRequests', label: 'Solic. abiertas', align: 'right' },
    { key: 'rating', label: 'Rating', align: 'right' },
  ];

  readonly filteredRows = computed<RepTableRow[]>(() => {
    const q = this.search().trim().toLowerCase();
    const rows = this.snapshot()?.rows ?? [];
    if (!q) return rows;
    return rows.filter((r) => {
      const ref = String(r['ref'] ?? '').toLowerCase();
      const title = String(r['title'] ?? '').toLowerCase();
      const cat = String(r['category'] ?? '').toLowerCase();
      return ref.includes(q) || title.includes(q) || cat.includes(q);
    });
  });

  readonly emptyMode = computed<'empty' | 'filtered'>(() =>
    this.search().trim() !== '' && this.filteredRows().length === 0 ? 'filtered' : 'empty',
  );

  ngOnInit(): void {
    this.facade.load();
  }

  refresh(): void {
    this.facade.refresh();
  }

  onFilterReset(): void {
    this.search.set('');
  }
}
