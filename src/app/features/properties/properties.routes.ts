import { Routes } from '@angular/router';
import { propertiesFeatureProviders } from '@features/properties/properties.providers';

export const PROPERTIES_ROUTES: Routes = [
  {
    path: '',
    providers: propertiesFeatureProviders,
    loadComponent: () =>
      import(
        '@features/properties/presentation/properties-list-page/properties-list-page.component'
      ).then((m) => m.PropertiesListPageComponent),
  },
];
