import { Provider } from '@angular/core';
import { PARAMETERS_HUB_REPOSITORY } from '@features/parameters/domain/parameters-hub.repository';
import { PARAMETERS_SECTIONS_REPOSITORY } from '@features/parameters/domain/parameters-sections.repository';
import { PARAMETERS_ADVANCED_REPOSITORY } from '@features/parameters/domain/parameters-advanced.repository';
import { ParametersHubMockRepository } from '@features/parameters/infrastructure/parameters-hub-mock.repository';
import { ParametersSectionsMockRepository } from '@features/parameters/infrastructure/parameters-sections-mock.repository';
import { ParametersAdvancedMockRepository } from '@features/parameters/infrastructure/parameters-advanced-mock.repository';
import { ParametersHubFacade } from '@features/parameters/application/parameters-hub.facade';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import { ParametersAdvancedFacade } from '@features/parameters/application/parameters-advanced.facade';

export const parametersHubFeatureProviders: Provider[] = [
  ParametersHubFacade,
  { provide: PARAMETERS_HUB_REPOSITORY, useClass: ParametersHubMockRepository },
];

export const parametersSectionsFeatureProviders: Provider[] = [
  ParametersSectionsFacade,
  { provide: PARAMETERS_SECTIONS_REPOSITORY, useClass: ParametersSectionsMockRepository },
];

export const parametersAdvancedFeatureProviders: Provider[] = [
  ParametersAdvancedFacade,
  { provide: PARAMETERS_ADVANCED_REPOSITORY, useClass: ParametersAdvancedMockRepository },
];
