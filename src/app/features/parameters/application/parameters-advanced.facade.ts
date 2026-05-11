import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { PARAMETERS_ADVANCED_REPOSITORY } from '@features/parameters/domain/parameters-advanced.repository';
import type { ParametersAdvancedListSnapshot } from '@features/parameters/domain/parameters-advanced.models';

@Injectable()
export class ParametersAdvancedFacade {
  private readonly repository = inject(PARAMETERS_ADVANCED_REPOSITORY);

  readonly snapshot = signal<ParametersAdvancedListSnapshot | null>(null);
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
          this.error.set('No se pudo cargar el inventario técnico.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
