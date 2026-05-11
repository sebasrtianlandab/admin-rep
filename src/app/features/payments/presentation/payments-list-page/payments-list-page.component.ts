import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, model, signal } from '@angular/core';
import { PaymentsFacade } from '@features/payments/application/payments.facade';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepConfirmDialogComponent } from '@shared/ui/composite/rep-confirm-dialog/rep-confirm-dialog.component';
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
  selector: 'app-payments-list-page',
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
    RepConfirmDialogComponent,
  ],
  templateUrl: './payments-list-page.component.html',
  styleUrl: './payments-list-page.component.scss',
})
export class PaymentsListPageComponent implements OnInit {
  private readonly facade = inject(PaymentsFacade);

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly search = model('');
  readonly retryTarget = signal<RepTableRow | null>(null);
  readonly confirmRetryOpen = model(false);

  readonly columns: RepTableColumn[] = [
    { key: 'id', label: 'ID pago', sortable: true, width: '8rem' },
    { key: 'user', label: 'Usuario', width: '7rem' },
    { key: 'amount', label: 'Importe', align: 'right', sortable: true },
    { key: 'currency', label: 'Mon.', width: '4rem' },
    { key: 'gateway', label: 'Gateway', cellType: 'badge', badgeVariant: 'neutral' },
    {
      key: 'status',
      label: 'Estado',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: {
        Completado: 'success',
        Fallido: 'danger',
        Pendiente: 'pending',
      },
    },
    { key: 'created', label: 'Creado', sortable: true },
    { key: '_actions', label: '', actions: true, width: '5rem' },
  ];

  readonly filteredRows = computed<RepTableRow[]>(() => {
    const q = this.search().trim().toLowerCase();
    const rows = this.snapshot()?.rows ?? [];
    if (!q) return rows;
    return rows.filter((r) => {
      const id = String(r['id'] ?? '').toLowerCase();
      const user = String(r['user'] ?? '').toLowerCase();
      const gw = String(r['gateway'] ?? '').toLowerCase();
      return id.includes(q) || user.includes(q) || gw.includes(q);
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

  openRetryConfirm(row: RepTableRow): void {
    this.retryTarget.set(row);
    this.confirmRetryOpen.set(true);
  }

  onRetryConfirmed(): void {
    this.retryTarget.set(null);
  }

  canRetry(row: RepTableRow): boolean {
    return String(row['status'] ?? '') === 'Fallido';
  }
}
