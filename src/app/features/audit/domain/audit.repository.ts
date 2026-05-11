import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditListSnapshot } from './audit.models';

export interface AuditRepository {
  getListSnapshot(): Observable<AuditListSnapshot>;
}

export const AUDIT_REPOSITORY = new InjectionToken<AuditRepository>('AuditRepository');
