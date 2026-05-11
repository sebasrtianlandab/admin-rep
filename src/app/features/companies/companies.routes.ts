import { Routes } from '@angular/router';
import { companiesFeatureProviders } from '@features/companies/companies.providers';

export const COMPANIES_ROUTES: Routes = [
  {
    path: '',
    providers: companiesFeatureProviders,
    loadComponent: () =>
      import(
        '@features/companies/presentation/companies-list-page/companies-list-page.component'
      ).then((m) => m.CompaniesListPageComponent),
  },
];
