import { Provider } from '@angular/core';
import { PAYMENTS_REPOSITORY } from '@features/payments/domain/payments.repository';
import { PaymentsMockRepository } from '@features/payments/infrastructure/payments-mock.repository';
import { PaymentsFacade } from '@features/payments/application/payments.facade';

export const paymentsFeatureProviders: Provider[] = [
  PaymentsFacade,
  { provide: PAYMENTS_REPOSITORY, useClass: PaymentsMockRepository },
];
