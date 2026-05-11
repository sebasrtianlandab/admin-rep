import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersAdvancedFacade } from '@features/parameters/application/parameters-advanced.facade';
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
  selector: 'app-parameters-advanced-page',
  imports: [
    DatePipe,
    RouterLink,
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
  templateUrl: './parameters-advanced-page.component.html',
  styleUrl: './parameters-advanced-page.component.scss',
})
export class ParametersAdvancedPageComponent implements OnInit {
  private readonly facade = inject(ParametersAdvancedFacade);

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly search = model('');

  readonly columns: RepTableColumn[] = [
    { key: 'key', label: 'Clave', sortable: true, truncate: true },
    { key: 'scope', label: 'Ámbito', sortable: true },
    { key: 'valueType', label: 'Tipo', cellType: 'badge', badgeVariant: 'neutral' },
    { key: 'preview', label: 'Vista previa', truncate: true },
    { key: 'source', label: 'Origen', cellType: 'badge', badgeVariant: 'outline' },
    {
      key: 'risk',
      label: 'Riesgo cambio',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: {
        Bajo: 'success',
        Alto: 'warning',
        Crítico: 'danger',
      },
    },
    { key: 'changed', label: 'Última modif.', sortable: true },
  ];

  readonly filteredRows = computed<RepTableRow[]>(() => {
    const q = this.search().trim().toLowerCase();
    const rows = this.snapshot()?.rows ?? [];
    if (!q) return rows;
    return rows.filter((r) => {
      const key = String(r['key'] ?? '').toLowerCase();
      const scope = String(r['scope'] ?? '').toLowerCase();
      return key.includes(q) || scope.includes(q);
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
