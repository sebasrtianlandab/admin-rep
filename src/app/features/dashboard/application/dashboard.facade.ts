import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { DASHBOARD_REPOSITORY } from '@features/dashboard/domain/dashboard.repository';
import { DashboardSnapshot } from '@features/dashboard/domain/dashboard.models';

/**
 * Application layer — orchestrates dashboard load; presentation consumes signals only.
 */
@Injectable()
export class DashboardFacade {
  private readonly repository = inject(DASHBOARD_REPOSITORY);

  readonly snapshot = signal<DashboardSnapshot | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.repository
      .getSnapshot()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.snapshot.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el panel. Reintente.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
