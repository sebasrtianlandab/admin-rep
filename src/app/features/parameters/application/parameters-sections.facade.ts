import { Injectable, inject, signal } from '@angular/core';
import { Observable, take } from 'rxjs';
import { PARAMETERS_SECTIONS_REPOSITORY } from '@features/parameters/domain/parameters-sections.repository';
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

@Injectable()
export class ParametersSectionsFacade {
  private readonly repository = inject(PARAMETERS_SECTIONS_REPOSITORY);

  readonly home = signal<ParametersHomeSnapshot | null>(null);
  readonly branding = signal<ParametersBrandingSnapshot | null>(null);
  readonly marketplace = signal<ParametersMarketplaceSnapshot | null>(null);
  readonly monetization = signal<ParametersMonetizationSnapshot | null>(null);
  readonly seo = signal<ParametersSeoSnapshot | null>(null);
  readonly integrations = signal<ParametersIntegrationsSnapshot | null>(null);
  readonly catalogs = signal<ParametersCatalogsSnapshot | null>(null);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  loadHome(): void {
    this.run(this.repository.getHome(), (d) => this.home.set(d));
  }

  loadBranding(): void {
    this.run(this.repository.getBranding(), (d) => this.branding.set(d));
  }

  loadMarketplace(): void {
    this.run(this.repository.getMarketplace(), (d) => this.marketplace.set(d));
  }

  loadMonetization(): void {
    this.run(this.repository.getMonetization(), (d) => this.monetization.set(d));
  }

  loadSeo(): void {
    this.run(this.repository.getSeo(), (d) => this.seo.set(d));
  }

  loadIntegrations(): void {
    this.run(this.repository.getIntegrations(), (d) => this.integrations.set(d));
  }

  loadCatalogs(): void {
    this.run(this.repository.getCatalogs(), (d) => this.catalogs.set(d));
  }

  saveHome(config: ParametersHomeConfig, onSuccess?: (data: ParametersHomeSnapshot) => void): void {
    this.mutate(this.repository.saveHome(config), (d) => {
      this.home.set(d);
      onSuccess?.(d);
    });
  }

  saveBranding(
    config: ParametersBrandingConfig,
    onSuccess?: (data: ParametersBrandingSnapshot) => void,
  ): void {
    this.mutate(this.repository.saveBranding(config), (d) => {
      this.branding.set(d);
      onSuccess?.(d);
    });
  }

  saveMarketplace(
    config: ParametersMarketplaceConfig,
    onSuccess?: (data: ParametersMarketplaceSnapshot) => void,
  ): void {
    this.mutate(this.repository.saveMarketplace(config), (d) => {
      this.marketplace.set(d);
      onSuccess?.(d);
    });
  }

  saveMonetization(
    config: ParametersMonetizationConfig,
    onSuccess?: (data: ParametersMonetizationSnapshot) => void,
  ): void {
    this.mutate(this.repository.saveMonetization(config), (d) => {
      this.monetization.set(d);
      onSuccess?.(d);
    });
  }

  saveSeo(config: ParametersSeoConfig, onSuccess?: (data: ParametersSeoSnapshot) => void): void {
    this.mutate(this.repository.saveSeo(config), (d) => {
      this.seo.set(d);
      onSuccess?.(d);
    });
  }

  saveIntegrations(
    items: ParametersIntegrationItem[],
    onSuccess?: (data: ParametersIntegrationsSnapshot) => void,
  ): void {
    this.mutate(this.repository.saveIntegrations(items), (d) => {
      this.integrations.set(d);
      onSuccess?.(d);
    });
  }

  saveCatalogs(
    items: ParametersCatalogItem[],
    onSuccess?: (data: ParametersCatalogsSnapshot) => void,
  ): void {
    this.mutate(this.repository.saveCatalogs(items), (d) => {
      this.catalogs.set(d);
      onSuccess?.(d);
    });
  }

  private run<T>(obs: Observable<T>, apply: (data: T) => void): void {
    this.loading.set(true);
    this.error.set(null);
    obs.pipe(take(1)).subscribe({
      next: (data) => {
        apply(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la sección.');
        this.loading.set(false);
      },
    });
  }

  private mutate<T>(obs: Observable<T>, apply: (data: T) => void): void {
    this.saving.set(true);
    this.error.set(null);
    obs.pipe(take(1)).subscribe({
      next: (data) => {
        apply(data);
        this.saving.set(false);
      },
      error: () => {
        this.error.set('No se pudo guardar la sección.');
        this.saving.set(false);
      },
    });
  }
}
