import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import type {
  ParametersBrandingSnapshot,
  ParametersCatalogsSnapshot,
  ParametersHomeSnapshot,
  ParametersIntegrationsSnapshot,
  ParametersMarketplaceSnapshot,
  ParametersMonetizationSnapshot,
  ParametersSeoSnapshot,
} from './parameters-sections.models';

export interface ParametersSectionsRepository {
  getHome(): Observable<ParametersHomeSnapshot>;
  getBranding(): Observable<ParametersBrandingSnapshot>;
  getMarketplace(): Observable<ParametersMarketplaceSnapshot>;
  getMonetization(): Observable<ParametersMonetizationSnapshot>;
  getSeo(): Observable<ParametersSeoSnapshot>;
  getIntegrations(): Observable<ParametersIntegrationsSnapshot>;
  getCatalogs(): Observable<ParametersCatalogsSnapshot>;
}

export const PARAMETERS_SECTIONS_REPOSITORY = new InjectionToken<ParametersSectionsRepository>(
  'ParametersSectionsRepository',
);
