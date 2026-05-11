import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardSnapshot } from '@features/dashboard/domain/dashboard.models';

export interface DashboardRepository {
  getSnapshot(): Observable<DashboardSnapshot>;
}

export const DASHBOARD_REPOSITORY = new InjectionToken<DashboardRepository>('DashboardRepository');
