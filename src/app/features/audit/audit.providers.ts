import { Provider } from '@angular/core';
import { AUDIT_REPOSITORY } from '@features/audit/domain/audit.repository';
import { AuditMockRepository } from '@features/audit/infrastructure/audit-mock.repository';
import { AuditFacade } from '@features/audit/application/audit.facade';

export const auditFeatureProviders: Provider[] = [
  AuditFacade,
  { provide: AUDIT_REPOSITORY, useClass: AuditMockRepository },
];
