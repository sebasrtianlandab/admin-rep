import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersListSnapshot } from './users.models';

export interface UsersRepository {
  getListSnapshot(): Observable<UsersListSnapshot>;
}

export const USERS_REPOSITORY = new InjectionToken<UsersRepository>('UsersRepository');
