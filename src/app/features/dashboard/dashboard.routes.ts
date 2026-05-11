import { Routes } from '@angular/router';
import { dashboardFeatureProviders } from '@features/dashboard/dashboard.providers';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    providers: dashboardFeatureProviders,
    loadComponent: () =>
      import('@features/dashboard/presentation/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent,
      ),
  },
];
