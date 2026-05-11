import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CompaniesListSnapshot } from './companies.models';

export interface CompaniesRepository {
  getListSnapshot(): Observable<CompaniesListSnapshot>;
}

export const COMPANIES_REPOSITORY = new InjectionToken<CompaniesRepository>('CompaniesRepository');
