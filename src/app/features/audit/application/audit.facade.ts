import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { AUDIT_REPOSITORY } from '@features/audit/domain/audit.repository';
import { AuditListSnapshot } from '@features/audit/domain/audit.models';

@Injectable()
export class AuditFacade {
  private readonly repository = inject(AUDIT_REPOSITORY);

  readonly snapshot = signal<AuditListSnapshot | null>(null);
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
          this.error.set('No se pudo cargar auditoría.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
