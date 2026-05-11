import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentsListSnapshot } from './payments.models';

export interface PaymentsRepository {
  getListSnapshot(): Observable<PaymentsListSnapshot>;
}

export const PAYMENTS_REPOSITORY = new InjectionToken<PaymentsRepository>('PaymentsRepository');
