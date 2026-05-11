import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, model } from '@angular/core';
import { SupportFacade } from '@features/support/application/support.facade';
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
  selector: 'app-support-list-page',
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
  templateUrl: './support-list-page.component.html',
  styleUrl: './support-list-page.component.scss',
})
export class SupportListPageComponent implements OnInit {
  private readonly facade = inject(SupportFacade);

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly search = model('');

  readonly columns: RepTableColumn[] = [
    { key: 'caseId', label: 'Caso', sortable: true, width: '7rem' },
    { key: 'subject', label: 'Asunto', sortable: true, truncate: true },
    {
      key: 'priority',
      label: 'Prioridad',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: { P1: 'danger', P2: 'warning', P3: 'neutral' },
    },
    { key: 'linked', label: 'Vínculo REP', truncate: true },
    { key: 'channel', label: 'Canal', cellType: 'badge', badgeVariant: 'outline' },
    {
      key: 'state',
      label: 'Estado',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: {
        Abierto: 'pending',
        'En curso': 'info',
        'Espera cliente': 'warning',
      },
    },
    { key: 'opened', label: 'Apertura', sortable: true },
  ];

  readonly filteredRows = computed<RepTableRow[]>(() => {
    const q = this.search().trim().toLowerCase();
    const rows = this.snapshot()?.rows ?? [];
    if (!q) return rows;
    return rows.filter((r) => {
      const id = String(r['caseId'] ?? '').toLowerCase();
      const sub = String(r['subject'] ?? '').toLowerCase();
      const linked = String(r['linked'] ?? '').toLowerCase();
      return id.includes(q) || sub.includes(q) || linked.includes(q);
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
