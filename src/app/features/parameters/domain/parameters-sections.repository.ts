import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import type {
  ParametersBrandingConfig,
  ParametersBrandingSnapshot,
  ParametersCatalogItem,
  ParametersCatalogsSnapshot,
  ParametersHomeConfig,
  ParametersHomeSnapshot,
  ParametersIntegrationItem,
  ParametersIntegrationsSnapshot,
  ParametersMarketplaceConfig,
  ParametersMarketplaceSnapshot,
  ParametersMonetizationConfig,
  ParametersMonetizationSnapshot,
  ParametersSeoConfig,
  ParametersSeoSnapshot,
} from './parameters-sections.models';

export interface ParametersSectionsRepository {
  getHome(): Observable<ParametersHomeSnapshot>;
  saveHome(config: ParametersHomeConfig): Observable<ParametersHomeSnapshot>;
  getBranding(): Observable<ParametersBrandingSnapshot>;
  saveBranding(config: ParametersBrandingConfig): Observable<ParametersBrandingSnapshot>;
  getMarketplace(): Observable<ParametersMarketplaceSnapshot>;
  saveMarketplace(config: ParametersMarketplaceConfig): Observable<ParametersMarketplaceSnapshot>;
  getMonetization(): Observable<ParametersMonetizationSnapshot>;
  saveMonetization(config: ParametersMonetizationConfig): Observable<ParametersMonetizationSnapshot>;
  getSeo(): Observable<ParametersSeoSnapshot>;
  saveSeo(config: ParametersSeoConfig): Observable<ParametersSeoSnapshot>;
  getIntegrations(): Observable<ParametersIntegrationsSnapshot>;
  saveIntegrations(items: ParametersIntegrationItem[]): Observable<ParametersIntegrationsSnapshot>;
  getCatalogs(): Observable<ParametersCatalogsSnapshot>;
  saveCatalogs(items: ParametersCatalogItem[]): Observable<ParametersCatalogsSnapshot>;
}

export const PARAMETERS_SECTIONS_REPOSITORY = new InjectionToken<ParametersSectionsRepository>(
  'ParametersSectionsRepository',
);
