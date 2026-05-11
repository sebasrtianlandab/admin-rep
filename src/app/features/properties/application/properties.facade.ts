import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { PROPERTIES_REPOSITORY } from '@features/properties/domain/properties.repository';
import { PropertiesListSnapshot } from '@features/properties/domain/properties.models';

@Injectable()
export class PropertiesFacade {
  private readonly repository = inject(PROPERTIES_REPOSITORY);

  readonly snapshot = signal<PropertiesListSnapshot | null>(null);
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
          this.error.set('No se pudo cargar propiedades.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
