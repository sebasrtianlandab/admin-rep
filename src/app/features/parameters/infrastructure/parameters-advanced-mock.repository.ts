import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { ParametersAdvancedRepository } from '@features/parameters/domain/parameters-advanced.repository';
import type { ParametersAdvancedListSnapshot } from '@features/parameters/domain/parameters-advanced.models';
import { buildParametersAdvancedListSnapshot } from '@features/parameters/infrastructure/parameters-advanced-mock.data';

@Injectable()
export class ParametersAdvancedMockRepository implements ParametersAdvancedRepository {
  getListSnapshot(): Observable<ParametersAdvancedListSnapshot> {
    return of(buildParametersAdvancedListSnapshot()).pipe(delay(260));
  }
}
