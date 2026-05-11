import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametersHubSnapshot } from './parameters-hub.models';

export interface ParametersHubRepository {
  getHub(): Observable<ParametersHubSnapshot>;
}

export const PARAMETERS_HUB_REPOSITORY = new InjectionToken<ParametersHubRepository>(
  'ParametersHubRepository',
);
