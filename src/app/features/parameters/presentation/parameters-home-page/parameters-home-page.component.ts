import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type {
  ParametersHomeConfig,
  ParametersHomeFaqItem,
  ParametersHomeHeroConfig,
  ParametersHomeSectionItem,
} from '@features/parameters/domain/parameters-sections.models';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepInputComponent } from '@shared/ui/primitives/rep-input/rep-input.component';
import { RepSelectComponent, type RepSelectOption } from '@shared/ui/primitives/rep-select/rep-select.component';
import { RepTextareaComponent } from '@shared/ui/primitives/rep-textarea/rep-textarea.component';
import { RepSwitchComponent } from '@shared/ui/primitives/rep-switch/rep-switch.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';

@Component({
  selector: 'app-parameters-home-page',
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
    RepSwitchComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepPageHeaderComponent,
    RepErrorStateComponent,
  ],
  templateUrl: './parameters-home-page.component.html',
  styleUrl: './parameters-home-page.component.scss',
})
export class ParametersHomePageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.home;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly draft = signal<ParametersHomeConfig | null>(null);

  readonly alignmentOptions: RepSelectOption[] = [
    { value: 'left', label: 'Izquierda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Derecha' },
  ];

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.config) !== JSON.stringify(draft);
  });

  readonly canSave = computed(() => {
    const draft = this.draft();
    if (!draft) return false;
    return draft.hero.title.trim() !== '' && draft.hero.ctaPrimary.trim() !== '';
  });

  readonly enabledFaqs = computed(() => this.draft()?.faqs.filter((item) => item.enabled) ?? []);

  readonly orderedSections = computed(() =>
    [...(this.draft()?.sections ?? [])].sort((a, b) => a.order - b.order),
  );

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.config));
    });
  }

  ngOnInit(): void {
    this.facade.loadHome();
  }

  refresh(): void {
    this.facade.loadHome();
  }

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.config));
  }

  save(): void {
    const draft = this.draft();
    if (!draft || !this.canSave()) return;
    this.facade.saveHome(structuredClone(draft));
  }

  patchHero<K extends keyof ParametersHomeHeroConfig>(
    key: K,
    value: ParametersHomeHeroConfig[K],
  ): void {
    this.draft.update((draft) => (draft ? { ...draft, hero: { ...draft.hero, [key]: value } } : draft));
  }

  setAlignment(value: string): void {
    if (value === 'left' || value === 'center' || value === 'right') {
      this.patchHero('alignment', value);
    }
  }

  patchFaq(id: string, patch: Partial<ParametersHomeFaqItem>): void {
    this.draft.update((draft) =>
      draft
        ? {
            ...draft,
            faqs: draft.faqs.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          }
        : draft,
    );
  }

  addFaq(): void {
    const nextId = `faq-${Date.now()}`;
    this.draft.update((draft) =>
      draft
        ? {
            ...draft,
            faqs: [
              ...draft.faqs,
              {
                id: nextId,
                question: 'Nueva pregunta',
                answer: 'Describe aquí la respuesta que verá el usuario.',
                enabled: true,
              },
            ],
          }
        : draft,
    );
  }

  removeFaq(id: string): void {
    this.draft.update((draft) =>
      draft ? { ...draft, faqs: draft.faqs.filter((item) => item.id !== id) } : draft,
    );
  }

  moveFaq(id: string, direction: -1 | 1): void {
    this.draft.update((draft) => {
      if (!draft) return draft;
      const idx = draft.faqs.findIndex((item) => item.id === id);
      const target = idx + direction;
      if (idx < 0 || target < 0 || target >= draft.faqs.length) return draft;
      const faqs = [...draft.faqs];
      [faqs[idx], faqs[target]] = [faqs[target], faqs[idx]];
      return { ...draft, faqs };
    });
  }

  patchSection(id: string, patch: Partial<ParametersHomeSectionItem>): void {
    this.draft.update((draft) =>
      draft
        ? {
            ...draft,
            sections: draft.sections.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          }
        : draft,
    );
  }

  asNumber(value: string): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  asText(value: number): string {
    return String(value);
  }
}
