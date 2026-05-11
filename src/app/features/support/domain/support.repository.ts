import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportListSnapshot } from './support.models';

export interface SupportRepository {
  getListSnapshot(): Observable<SupportListSnapshot>;
}

export const SUPPORT_REPOSITORY = new InjectionToken<SupportRepository>('SupportRepository');
