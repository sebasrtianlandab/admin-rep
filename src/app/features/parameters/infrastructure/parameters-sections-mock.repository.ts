import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { ParametersSectionsRepository } from '@features/parameters/domain/parameters-sections.repository';
import type {
  ParametersBrandingSnapshot,
  ParametersCatalogsSnapshot,
  ParametersHomeSnapshot,
  ParametersIntegrationsSnapshot,
  ParametersMarketplaceSnapshot,
  ParametersMonetizationSnapshot,
  ParametersSeoSnapshot,
} from '@features/parameters/domain/parameters-sections.models';
import {
  buildParametersBrandingSnapshot,
  buildParametersCatalogsSnapshot,
  buildParametersHomeSnapshot,
  buildParametersIntegrationsSnapshot,
  buildParametersMarketplaceSnapshot,
  buildParametersMonetizationSnapshot,
  buildParametersSeoSnapshot,
} from '@features/parameters/infrastructure/parameters-sections-mock.data';

@Injectable()
export class ParametersSectionsMockRepository implements ParametersSectionsRepository {
  getHome(): Observable<ParametersHomeSnapshot> {
    return of(buildParametersHomeSnapshot()).pipe(delay(220));
  }

  getBranding(): Observable<ParametersBrandingSnapshot> {
    return of(buildParametersBrandingSnapshot()).pipe(delay(200));
  }

  getMarketplace(): Observable<ParametersMarketplaceSnapshot> {
    return of(buildParametersMarketplaceSnapshot()).pipe(delay(230));
  }

  getMonetization(): Observable<ParametersMonetizationSnapshot> {
    return of(buildParametersMonetizationSnapshot()).pipe(delay(210));
  }

  getSeo(): Observable<ParametersSeoSnapshot> {
    return of(buildParametersSeoSnapshot()).pipe(delay(190));
  }

  getIntegrations(): Observable<ParametersIntegrationsSnapshot> {
    return of(buildParametersIntegrationsSnapshot()).pipe(delay(240));
  }

  getCatalogs(): Observable<ParametersCatalogsSnapshot> {
    return of(buildParametersCatalogsSnapshot()).pipe(delay(205));
  }
}
