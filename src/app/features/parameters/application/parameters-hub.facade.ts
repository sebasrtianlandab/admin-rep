import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { PARAMETERS_HUB_REPOSITORY } from '@features/parameters/domain/parameters-hub.repository';
import type { ParametersHubSnapshot } from '@features/parameters/domain/parameters-hub.models';

@Injectable()
export class ParametersHubFacade {
  private readonly repository = inject(PARAMETERS_HUB_REPOSITORY);

  readonly snapshot = signal<ParametersHubSnapshot | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.repository
      .getHub()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.snapshot.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el centro de parámetros.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
