import { Injectable, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { COMPANIES_REPOSITORY } from '@features/companies/domain/companies.repository';
import { CompaniesListSnapshot } from '@features/companies/domain/companies.models';

@Injectable()
export class CompaniesFacade {
  private readonly repository = inject(COMPANIES_REPOSITORY);

  readonly snapshot = signal<CompaniesListSnapshot | null>(null);
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
          this.error.set('No se pudo cargar empresas.');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.load();
  }
}
