import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, model, signal } from '@angular/core';
import { UsersFacade } from '@features/users/application/users.facade';
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
  selector: 'app-users-list-page',
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
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
})
export class UsersListPageComponent implements OnInit {
  private readonly facade = inject(UsersFacade);

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;

  readonly search = model('');
  readonly blockTarget = signal<RepTableRow | null>(null);
  readonly confirmBlockOpen = model(false);

  readonly columns: RepTableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '7rem' },
    { key: 'email', label: 'Email', sortable: true, truncate: true },
    { key: 'entityType', label: 'Tipo', cellType: 'badge', badgeVariant: 'neutral' },
    { key: 'roles', label: 'Roles portal', truncate: true },
    {
      key: 'account',
      label: 'Cuenta',
      cellType: 'badge',
      badgeVariant: 'neutral',
      badgeVariantByValue: {
        Activa: 'success',
        Bloqueada: 'danger',
        Pendiente: 'pending',
      },
    },
    { key: 'lastAccess', label: 'Último acceso', sortable: true },
    { key: 'flags', label: 'Señales' },
    { key: '_actions', label: '', actions: true, width: '6.5rem' },
  ];

  readonly filteredRows = computed<RepTableRow[]>(() => {
    const q = this.search().trim().toLowerCase();
    const rows = this.snapshot()?.rows ?? [];
    if (!q) return rows;
    return rows.filter((r) => {
      const id = String(r['id'] ?? '').toLowerCase();
      const email = String(r['email'] ?? '').toLowerCase();
      const roles = String(r['roles'] ?? '').toLowerCase();
      return id.includes(q) || email.includes(q) || roles.includes(q);
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

  openBlockConfirm(row: RepTableRow): void {
    this.blockTarget.set(row);
    this.confirmBlockOpen.set(true);
  }

  onBlockConfirmed(): void {
    this.blockTarget.set(null);
  }

  isAccountBlocked(row: RepTableRow): boolean {
    return String(row['account'] ?? '') === 'Bloqueada';
  }
}
