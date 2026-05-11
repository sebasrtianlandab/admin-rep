import { Routes } from '@angular/router';
import {
  parametersAdvancedFeatureProviders,
  parametersHubFeatureProviders,
  parametersSectionsFeatureProviders,
} from '@features/parameters/parameters.providers';

export const PARAMETERS_ROUTES: Routes = [
  {
    path: '',
    providers: parametersHubFeatureProviders,
    loadComponent: () =>
      import('@features/parameters/presentation/parameters-hub-page/parameters-hub-page.component').then(
        (m) => m.ParametersHubPageComponent,
      ),
  },
  {
    path: 'home',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import('@features/parameters/presentation/parameters-home-page/parameters-home-page.component').then(
        (m) => m.ParametersHomePageComponent,
      ),
  },
  {
    path: 'branding',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import(
        '@features/parameters/presentation/parameters-branding-page/parameters-branding-page.component'
      ).then((m) => m.ParametersBrandingPageComponent),
  },
  {
    path: 'marketplace',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import(
        '@features/parameters/presentation/parameters-marketplace-page/parameters-marketplace-page.component'
      ).then((m) => m.ParametersMarketplacePageComponent),
  },
  {
    path: 'monetization',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import(
        '@features/parameters/presentation/parameters-monetization-page/parameters-monetization-page.component'
      ).then((m) => m.ParametersMonetizationPageComponent),
  },
  {
    path: 'seo',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import('@features/parameters/presentation/parameters-seo-page/parameters-seo-page.component').then(
        (m) => m.ParametersSeoPageComponent,
      ),
  },
  {
    path: 'integrations',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import(
        '@features/parameters/presentation/parameters-integrations-page/parameters-integrations-page.component'
      ).then((m) => m.ParametersIntegrationsPageComponent),
  },
  {
    path: 'catalogs',
    providers: parametersSectionsFeatureProviders,
    loadComponent: () =>
      import(
        '@features/parameters/presentation/parameters-catalogs-page/parameters-catalogs-page.component'
      ).then((m) => m.ParametersCatalogsPageComponent),
  },
  {
    path: 'advanced',
    providers: parametersAdvancedFeatureProviders,
    loadComponent: () =>
      import(
        '@features/parameters/presentation/parameters-advanced-page/parameters-advanced-page.component'
      ).then((m) => m.ParametersAdvancedPageComponent),
  },
];
