import { Routes } from '@angular/router';
import { usersFeatureProviders } from '@features/users/users.providers';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    providers: usersFeatureProviders,
    loadComponent: () =>
      import('@features/users/presentation/users-list-page/users-list-page.component').then(
        (m) => m.UsersListPageComponent,
      ),
  },
];
