import { Provider } from '@angular/core';
import { SERVICES_REPOSITORY } from '@features/services/domain/services.repository';
import { ServicesMockRepository } from '@features/services/infrastructure/services-mock.repository';
import { ServicesFacade } from '@features/services/application/services.facade';

export const servicesFeatureProviders: Provider[] = [
  ServicesFacade,
  { provide: SERVICES_REPOSITORY, useClass: ServicesMockRepository },
];
