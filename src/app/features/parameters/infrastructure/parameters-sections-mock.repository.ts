import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { ParametersSectionsRepository } from '@features/parameters/domain/parameters-sections.repository';
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
  private home = buildParametersHomeSnapshot();
  private branding = buildParametersBrandingSnapshot();
  private marketplace = buildParametersMarketplaceSnapshot();
  private monetization = buildParametersMonetizationSnapshot();
  private seo = buildParametersSeoSnapshot();
  private integrations = buildParametersIntegrationsSnapshot();
  private catalogs = buildParametersCatalogsSnapshot();

  getHome(): Observable<ParametersHomeSnapshot> {
    return of(structuredClone(this.home)).pipe(delay(180));
  }

  saveHome(config: ParametersHomeConfig): Observable<ParametersHomeSnapshot> {
    this.home = {
      ...this.home,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Mariana Torres',
        editorRole: 'Marketing Lead',
        summary: 'Se actualizó el contenido de la home desde Parámetros.',
      },
      config: structuredClone(config),
    };
    return of(structuredClone(this.home)).pipe(delay(420));
  }

  getBranding(): Observable<ParametersBrandingSnapshot> {
    return of(structuredClone(this.branding)).pipe(delay(180));
  }

  saveBranding(config: ParametersBrandingConfig): Observable<ParametersBrandingSnapshot> {
    this.branding = {
      ...this.branding,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Diego Molina',
        editorRole: 'Brand Manager',
        summary: 'Se actualizó branding y presets visuales.',
      },
      config: structuredClone(config),
    };
    return of(structuredClone(this.branding)).pipe(delay(420));
  }

  getMarketplace(): Observable<ParametersMarketplaceSnapshot> {
    return of(structuredClone(this.marketplace)).pipe(delay(180));
  }

  saveMarketplace(config: ParametersMarketplaceConfig): Observable<ParametersMarketplaceSnapshot> {
    this.marketplace = {
      ...this.marketplace,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Sofía Ramírez',
        editorRole: 'Operations Manager',
        summary: 'Se ajustó workflow de estados y reglas de publicación.',
      },
      config: structuredClone(config),
    };
    return of(structuredClone(this.marketplace)).pipe(delay(420));
  }

  getMonetization(): Observable<ParametersMonetizationSnapshot> {
    return of(structuredClone(this.monetization)).pipe(delay(180));
  }

  saveMonetization(config: ParametersMonetizationConfig): Observable<ParametersMonetizationSnapshot> {
    this.monetization = {
      ...this.monetization,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Carlos Vega',
        editorRole: 'Revenue Ops',
        summary: 'Se guardaron ajustes de pricing, límites y créditos.',
      },
      config: structuredClone(config),
    };
    return of(structuredClone(this.monetization)).pipe(delay(420));
  }

  getSeo(): Observable<ParametersSeoSnapshot> {
    return of(structuredClone(this.seo)).pipe(delay(180));
  }

  saveSeo(config: ParametersSeoConfig): Observable<ParametersSeoSnapshot> {
    this.seo = {
      ...this.seo,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Lucía Herrera',
        editorRole: 'SEO Lead',
        summary: 'Se actualizó metadata global y preview SERP.',
      },
      config: structuredClone(config),
    };
    return of(structuredClone(this.seo)).pipe(delay(420));
  }

  getIntegrations(): Observable<ParametersIntegrationsSnapshot> {
    return of(structuredClone(this.integrations)).pipe(delay(180));
  }

  saveIntegrations(items: ParametersIntegrationItem[]): Observable<ParametersIntegrationsSnapshot> {
    this.integrations = {
      ...this.integrations,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Miguel Paredes',
        editorRole: 'Platform Admin',
        summary: 'Se guardaron cambios operativos en integraciones.',
      },
      items: structuredClone(items),
    };
    return of(structuredClone(this.integrations)).pipe(delay(420));
  }

  getCatalogs(): Observable<ParametersCatalogsSnapshot> {
    return of(structuredClone(this.catalogs)).pipe(delay(180));
  }

  saveCatalogs(items: ParametersCatalogItem[]): Observable<ParametersCatalogsSnapshot> {
    this.catalogs = {
      ...this.catalogs,
      generatedAt: new Date().toISOString(),
      audit: {
        updatedAt: new Date().toISOString(),
        updatedBy: 'Ana Rojas',
        editorRole: 'Data Steward',
        summary: 'Se actualizaron propiedades operativas de catálogos.',
      },
      items: structuredClone(items),
    };
    return of(structuredClone(this.catalogs)).pipe(delay(420));
  }
}
