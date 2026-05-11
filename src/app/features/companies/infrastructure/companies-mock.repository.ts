import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompaniesRepository } from '@features/companies/domain/companies.repository';
import { CompaniesListSnapshot } from '@features/companies/domain/companies.models';
import { buildCompaniesListSnapshot } from '@features/companies/infrastructure/companies-mock.data';

@Injectable()
export class CompaniesMockRepository implements CompaniesRepository {
  getListSnapshot(): Observable<CompaniesListSnapshot> {
    return of(buildCompaniesListSnapshot()).pipe(delay(280));
  }
}
