import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type { ParametersSeoConfig } from '@features/parameters/domain/parameters-sections.models';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepInputComponent } from '@shared/ui/primitives/rep-input/rep-input.component';
import { RepSelectComponent, type RepSelectOption } from '@shared/ui/primitives/rep-select/rep-select.component';
import { RepTextareaComponent } from '@shared/ui/primitives/rep-textarea/rep-textarea.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';

@Component({
  selector: 'app-parameters-seo-page',
  imports: [
    DatePipe,
    RouterLink,
    RepIconsModule,
    RepBadgeComponent,
    RepButtonComponent,
    RepCardComponent,
    RepInputComponent,
    RepSelectComponent,
    RepTextareaComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepPageHeaderComponent,
    RepErrorStateComponent,
  ],
  templateUrl: './parameters-seo-page.component.html',
  styleUrl: './parameters-seo-page.component.scss',
})
export class ParametersSeoPageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.seo;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly draft = signal<ParametersSeoConfig | null>(null);

  readonly robotsOptions: RepSelectOption[] = [
    { value: 'index,follow', label: 'index,follow' },
    { value: 'noindex,follow', label: 'noindex,follow' },
    { value: 'noindex,nofollow', label: 'noindex,nofollow' },
  ];

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.config) !== JSON.stringify(draft);
  });

  readonly canSave = computed(() => {
    const draft = this.draft();
    if (!draft) return false;
    return draft.metaTitle.trim() !== '' && draft.metaDescription.trim() !== '';
  });

  readonly keywordList = computed(() =>
    (this.draft()?.keywords ?? '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  );

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.config));
    });
  }

  ngOnInit(): void {
    this.facade.loadSeo();
  }

  refresh(): void {
    this.facade.loadSeo();
  }

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.config));
  }

  save(): void {
    const draft = this.draft();
    if (!draft || !this.canSave()) return;
    this.facade.saveSeo(structuredClone(draft));
  }

  patch<K extends keyof ParametersSeoConfig>(key: K, value: ParametersSeoConfig[K]): void {
    this.draft.update((draft) => (draft ? { ...draft, [key]: value } : draft));
  }

  setRobots(value: string): void {
    if (value === 'index,follow' || value === 'noindex,follow' || value === 'noindex,nofollow') {
      this.patch('robots', value);
    }
  }
}
