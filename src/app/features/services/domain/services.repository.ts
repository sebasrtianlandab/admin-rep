import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesListSnapshot } from './services.models';

export interface ServicesRepository {
  getListSnapshot(): Observable<ServicesListSnapshot>;
}

export const SERVICES_REPOSITORY = new InjectionToken<ServicesRepository>('ServicesRepository');
