import { Routes } from '@angular/router';
import { paymentsFeatureProviders } from '@features/payments/payments.providers';

export const PAYMENTS_ROUTES: Routes = [
  {
    path: '',
    providers: paymentsFeatureProviders,
    loadComponent: () =>
      import(
        '@features/payments/presentation/payments-list-page/payments-list-page.component'
      ).then((m) => m.PaymentsListPageComponent),
  },
];
