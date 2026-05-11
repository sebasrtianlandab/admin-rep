import { Routes } from '@angular/router';
import { auditFeatureProviders } from '@features/audit/audit.providers';

export const AUDIT_ROUTES: Routes = [
  {
    path: '',
    providers: auditFeatureProviders,
    loadComponent: () =>
      import('@features/audit/presentation/audit-list-page/audit-list-page.component').then(
        (m) => m.AuditListPageComponent,
      ),
  },
];
