import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ServicesRepository } from '@features/services/domain/services.repository';
import { ServicesListSnapshot } from '@features/services/domain/services.models';
import { buildServicesListSnapshot } from '@features/services/infrastructure/services-mock.data';

@Injectable()
export class ServicesMockRepository implements ServicesRepository {
  getListSnapshot(): Observable<ServicesListSnapshot> {
    return of(buildServicesListSnapshot()).pipe(delay(290));
  }
}
