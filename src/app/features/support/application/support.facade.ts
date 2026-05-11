import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { SUPPORT_REPOSITORY } from '@features/support/domain/support.repository';
import { SupportListSnapshot } from '@features/support/domain/support.models';

@Injectable()
export class SupportFacade {
  private readonly repository = inject(SUPPORT_REPOSITORY);

  readonly snapshot = signal<SupportListSnapshot | null>(null);
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
          this.error.set('No se pudo cargar soporte.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
