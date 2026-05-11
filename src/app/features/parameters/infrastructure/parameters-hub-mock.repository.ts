import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { ParametersHubRepository } from '@features/parameters/domain/parameters-hub.repository';
import type { ParametersHubSnapshot } from '@features/parameters/domain/parameters-hub.models';
import { buildParametersHubSnapshot } from '@features/parameters/infrastructure/parameters-hub-mock.data';

@Injectable()
export class ParametersHubMockRepository implements ParametersHubRepository {
  getHub(): Observable<ParametersHubSnapshot> {
    return of(buildParametersHubSnapshot()).pipe(delay(200));
  }
}
