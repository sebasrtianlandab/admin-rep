import { Provider } from '@angular/core';
import { SUPPORT_REPOSITORY } from '@features/support/domain/support.repository';
import { SupportMockRepository } from '@features/support/infrastructure/support-mock.repository';
import { SupportFacade } from '@features/support/application/support.facade';

export const supportFeatureProviders: Provider[] = [
  SupportFacade,
  { provide: SUPPORT_REPOSITORY, useClass: SupportMockRepository },
];
