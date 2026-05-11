import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SupportRepository } from '@features/support/domain/support.repository';
import { SupportListSnapshot } from '@features/support/domain/support.models';
import { buildSupportListSnapshot } from '@features/support/infrastructure/support-mock.data';

@Injectable()
export class SupportMockRepository implements SupportRepository {
  getListSnapshot(): Observable<SupportListSnapshot> {
    return of(buildSupportListSnapshot()).pipe(delay(270));
  }
}
