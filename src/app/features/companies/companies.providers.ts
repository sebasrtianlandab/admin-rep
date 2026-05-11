import { Provider } from '@angular/core';
import { COMPANIES_REPOSITORY } from '@features/companies/domain/companies.repository';
import { CompaniesMockRepository } from '@features/companies/infrastructure/companies-mock.repository';
import { CompaniesFacade } from '@features/companies/application/companies.facade';

export const companiesFeatureProviders: Provider[] = [
  CompaniesFacade,
  { provide: COMPANIES_REPOSITORY, useClass: CompaniesMockRepository },
];
