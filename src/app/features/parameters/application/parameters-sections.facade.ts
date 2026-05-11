import { Injectable, inject, signal } from '@angular/core';
import { Observable, take } from 'rxjs';
import { PARAMETERS_SECTIONS_REPOSITORY } from '@features/parameters/domain/parameters-sections.repository';
import type {
  ParametersBrandingSnapshot,
  ParametersCatalogsSnapshot,
  ParametersHomeSnapshot,
  ParametersIntegrationsSnapshot,
  ParametersMarketplaceSnapshot,
  ParametersMonetizationSnapshot,
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
}
