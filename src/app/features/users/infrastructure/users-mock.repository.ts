import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsersRepository } from '@features/users/domain/users.repository';
import { UsersListSnapshot } from '@features/users/domain/users.models';
import { buildUsersListSnapshot } from '@features/users/infrastructure/users-mock.data';

@Injectable()
export class UsersMockRepository implements UsersRepository {
  getListSnapshot(): Observable<UsersListSnapshot> {
    return of(buildUsersListSnapshot()).pipe(delay(320));
  }
}
