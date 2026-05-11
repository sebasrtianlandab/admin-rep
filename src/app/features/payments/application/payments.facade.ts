import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { PAYMENTS_REPOSITORY } from '@features/payments/domain/payments.repository';
import { PaymentsListSnapshot } from '@features/payments/domain/payments.models';

@Injectable()
export class PaymentsFacade {
  private readonly repository = inject(PAYMENTS_REPOSITORY);

  readonly snapshot = signal<PaymentsListSnapshot | null>(null);
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
          this.error.set('No se pudo cargar pagos.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
