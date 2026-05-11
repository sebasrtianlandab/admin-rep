import { Component, OnInit, inject, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardFacade } from '@features/dashboard/application/dashboard.facade';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepKpiCardComponent } from '@shared/ui/data-display/rep-kpi-card/rep-kpi-card.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepDataTableComponent } from '@shared/ui/composite/rep-data-table/rep-data-table.component';
import { RepTableColumn, RepTableRow } from '@shared/ui/composite/rep-data-table/rep-data-table.models';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';
import { DashboardChartPanelComponent } from '@features/dashboard/presentation/widgets/dashboard-chart-panel/dashboard-chart-panel.component';

@Component({
  selector: 'app-dashboard-page',
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
    DashboardChartPanelComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private readonly facade = inject(DashboardFacade);

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;

  readonly activityColumns: RepTableColumn[] = [
    { key: 'date', label: 'Fecha / hora', sortable: true },
    { key: 'kind', label: 'Tipo' },
    { key: 'actor', label: 'Actor' },
    { key: 'summary', label: 'Detalle', truncate: true },
    {
      key: 'outcome',
      label: 'Resultado',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: {
        Completado: 'success',
        OK: 'success',
        Pendiente: 'pending',
        'Crédito consumido': 'info',
        'Pool actualizado': 'info',
      },
    },
  ];

  readonly activityRows = computed<RepTableRow[]>(() => {
    const act = this.snapshot()?.activity ?? [];
    return act.map((a) => ({
      date: a.date,
      kind: a.kind,
      actor: a.actor,
      summary: a.summary,
      outcome: a.outcome,
    }));
  });

  ngOnInit(): void {
    this.facade.load();
  }

  refresh(): void {
    this.facade.refresh();
  }
}
