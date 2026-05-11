import { Routes } from '@angular/router';
import { supportFeatureProviders } from '@features/support/support.providers';

export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    providers: supportFeatureProviders,
    loadComponent: () =>
      import(
        '@features/support/presentation/support-list-page/support-list-page.component'
      ).then((m) => m.SupportListPageComponent),
  },
];
