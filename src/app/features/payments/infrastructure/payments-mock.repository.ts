import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PaymentsRepository } from '@features/payments/domain/payments.repository';
import { PaymentsListSnapshot } from '@features/payments/domain/payments.models';
import { buildPaymentsListSnapshot } from '@features/payments/infrastructure/payments-mock.data';

@Injectable()
export class PaymentsMockRepository implements PaymentsRepository {
  getListSnapshot(): Observable<PaymentsListSnapshot> {
    return of(buildPaymentsListSnapshot()).pipe(delay(310));
  }
}
