import { Provider } from '@angular/core';
import { USERS_REPOSITORY } from '@features/users/domain/users.repository';
import { UsersMockRepository } from '@features/users/infrastructure/users-mock.repository';
import { UsersFacade } from '@features/users/application/users.facade';

export const usersFeatureProviders: Provider[] = [
  UsersFacade,
  { provide: USERS_REPOSITORY, useClass: UsersMockRepository },
];
