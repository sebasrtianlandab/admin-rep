import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametersAdvancedListSnapshot } from './parameters-advanced.models';

export interface ParametersAdvancedRepository {
  getListSnapshot(): Observable<ParametersAdvancedListSnapshot>;
}

export const PARAMETERS_ADVANCED_REPOSITORY = new InjectionToken<ParametersAdvancedRepository>(
  'ParametersAdvancedRepository',
);
