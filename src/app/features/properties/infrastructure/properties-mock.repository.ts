import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PropertiesRepository } from '@features/properties/domain/properties.repository';
import { PropertiesListSnapshot } from '@features/properties/domain/properties.models';
import { buildPropertiesListSnapshot } from '@features/properties/infrastructure/properties-mock.data';

@Injectable()
export class PropertiesMockRepository implements PropertiesRepository {
  getListSnapshot(): Observable<PropertiesListSnapshot> {
    return of(buildPropertiesListSnapshot()).pipe(delay(300));
  }
}
