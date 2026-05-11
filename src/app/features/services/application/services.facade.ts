import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { SERVICES_REPOSITORY } from '@features/services/domain/services.repository';
import { ServicesListSnapshot } from '@features/services/domain/services.models';

@Injectable()
export class ServicesFacade {
  private readonly repository = inject(SERVICES_REPOSITORY);

  readonly snapshot = signal<ServicesListSnapshot | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.repository
      .getListSnapshot()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.snapshot.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar servicios.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
