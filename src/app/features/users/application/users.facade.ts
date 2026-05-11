import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { USERS_REPOSITORY } from '@features/users/domain/users.repository';
import { UsersListSnapshot } from '@features/users/domain/users.models';

@Injectable()
export class UsersFacade {
  private readonly repository = inject(USERS_REPOSITORY);

  readonly snapshot = signal<UsersListSnapshot | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.repository
      .getListSnapshot()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.snapshot.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el listado de usuarios.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
