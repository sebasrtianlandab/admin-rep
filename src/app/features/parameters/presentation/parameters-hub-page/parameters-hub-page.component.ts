import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersHubFacade } from '@features/parameters/application/parameters-hub.facade';
import type { ParametersHubCard } from '@features/parameters/domain/parameters-hub.models';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';

@Component({
  selector: 'app-parameters-hub-page',
  imports: [
    DatePipe,
    RouterLink,
    RepIconsModule,
    RepPageHeaderComponent,
    RepBadgeComponent,
    RepButtonComponent,
    RepCardComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepErrorStateComponent,
  ],
  templateUrl: './parameters-hub-page.component.html',
  styleUrl: './parameters-hub-page.component.scss',
})
export class ParametersHubPageComponent implements OnInit {
  private readonly facade = inject(ParametersHubFacade);
  private readonly pageSize = 6;

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly cards = computed(() => this.snapshot()?.cards ?? []);
  readonly pageIndex = signal(0);
  readonly skeletonCards = [1, 2, 3, 4, 5, 6];
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.cards().length / this.pageSize)));
  readonly pagedCards = computed(() => {
    const start = this.pageIndex() * this.pageSize;
    return this.cards().slice(start, start + this.pageSize);
  });

  constructor() {
    effect(() => {
      const lastPage = this.totalPages() - 1;

      if (this.pageIndex() > lastPage) {
        this.pageIndex.set(lastPage);
      }
    });
  }

  ngOnInit(): void {
    this.facade.load();
  }

  refresh(): void {
    this.facade.refresh();
  }

  previousPage(): void {
    this.pageIndex.update((current) => Math.max(0, current - 1));
  }

  nextPage(): void {
    this.pageIndex.update((current) => Math.min(this.totalPages() - 1, current + 1));
  }

  pageRangeLabel(): string {
    const total = this.cards().length;

    if (total === 0) {
      return '0 de 0';
    }

    const start = this.pageIndex() * this.pageSize + 1;
    const end = Math.min(total, start + this.pageSize - 1);
    return `${start}-${end} de ${total}`;
  }

  trackById(_: number, card: ParametersHubCard): string {
    return card.id;
  }

  routeFor(card: ParametersHubCard): string[] {
    return ['/parameters', card.path];
  }

  isPlatformCard(card: ParametersHubCard): boolean {
    return ['integrations', 'catalogs', 'advanced'].includes(card.id);
  }
}
