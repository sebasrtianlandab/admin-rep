import { Provider } from '@angular/core';
import { DASHBOARD_REPOSITORY } from '@features/dashboard/domain/dashboard.repository';
import { DashboardMockRepository } from '@features/dashboard/infrastructure/dashboard-mock.repository';
import { DashboardFacade } from '@features/dashboard/application/dashboard.facade';

export const dashboardFeatureProviders: Provider[] = [
  DashboardFacade,
  { provide: DASHBOARD_REPOSITORY, useClass: DashboardMockRepository },
];
