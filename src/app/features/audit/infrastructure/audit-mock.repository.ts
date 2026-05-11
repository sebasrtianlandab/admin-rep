import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuditRepository } from '@features/audit/domain/audit.repository';
import { AuditListSnapshot } from '@features/audit/domain/audit.models';
import { buildAuditListSnapshot } from '@features/audit/infrastructure/audit-mock.data';

@Injectable()
export class AuditMockRepository implements AuditRepository {
  getListSnapshot(): Observable<AuditListSnapshot> {
    return of(buildAuditListSnapshot()).pipe(delay(250));
  }
}
