import { Routes } from '@angular/router';
import { servicesFeatureProviders } from '@features/services/services.providers';

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    providers: servicesFeatureProviders,
    loadComponent: () =>
      import(
        '@features/services/presentation/services-list-page/services-list-page.component'
      ).then((m) => m.ServicesListPageComponent),
  },
];
