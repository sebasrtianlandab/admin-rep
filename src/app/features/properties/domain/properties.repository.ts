import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertiesListSnapshot } from './properties.models';

export interface PropertiesRepository {
  getListSnapshot(): Observable<PropertiesListSnapshot>;
}

export const PROPERTIES_REPOSITORY = new InjectionToken<PropertiesRepository>('PropertiesRepository');
