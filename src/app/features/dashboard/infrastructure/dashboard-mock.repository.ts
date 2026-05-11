import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardRepository } from '@features/dashboard/domain/dashboard.repository';
import { DashboardSnapshot } from '@features/dashboard/domain/dashboard.models';
import { buildMockDashboardSnapshot } from '@features/dashboard/infrastructure/dashboard-mock.data';

/**
 * Infrastructure — simulated latency; swap for HTTP repository later.
 */
@Injectable()
export class DashboardMockRepository implements DashboardRepository {
  getSnapshot(): Observable<DashboardSnapshot> {
    return of(buildMockDashboardSnapshot()).pipe(delay(380));
  }
}
