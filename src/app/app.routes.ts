import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@core/layout/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'properties',
        loadChildren: () =>
          import('@features/properties/properties.routes').then((m) => m.PROPERTIES_ROUTES),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('@features/services/services.routes').then((m) => m.SERVICES_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () => import('@features/users/users.routes').then((m) => m.USERS_ROUTES),
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('@features/companies/companies.routes').then((m) => m.COMPANIES_ROUTES),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('@features/payments/payments.routes').then((m) => m.PAYMENTS_ROUTES),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('@features/support/support.routes').then((m) => m.SUPPORT_ROUTES),
      },
      {
        path: 'parameters',
        loadChildren: () =>
          import('@features/parameters/parameters.routes').then((m) => m.PARAMETERS_ROUTES),
      },
      {
        path: 'audit',
        loadChildren: () => import('@features/audit/audit.routes').then((m) => m.AUDIT_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
