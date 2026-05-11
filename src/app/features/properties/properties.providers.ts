import { Provider } from '@angular/core';
import { PROPERTIES_REPOSITORY } from '@features/properties/domain/properties.repository';
import { PropertiesMockRepository } from '@features/properties/infrastructure/properties-mock.repository';
import { PropertiesFacade } from '@features/properties/application/properties.facade';

export const propertiesFeatureProviders: Provider[] = [
  PropertiesFacade,
  { provide: PROPERTIES_REPOSITORY, useClass: PropertiesMockRepository },
];
