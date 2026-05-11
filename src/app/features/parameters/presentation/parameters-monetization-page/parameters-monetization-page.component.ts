import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type { ParametersMonetizationConfig } from '@features/parameters/domain/parameters-sections.models';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepInputComponent } from '@shared/ui/primitives/rep-input/rep-input.component';
import { RepTextareaComponent } from '@shared/ui/primitives/rep-textarea/rep-textarea.component';
import { RepSwitchComponent } from '@shared/ui/primitives/rep-switch/rep-switch.component';
import { RepTabsComponent, type RepTabItem } from '@shared/ui/navigation/rep-tabs/rep-tabs.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';

@Component({
  selector: 'app-parameters-monetization-page',
  imports: [
    DatePipe,
    RouterLink,
    RepIconsModule,
    RepBadgeComponent,
    RepButtonComponent,
    RepCardComponent,
    RepInputComponent,
    RepTextareaComponent,
    RepSwitchComponent,
    RepTabsComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepPageHeaderComponent,
    RepErrorStateComponent,
  ],
  templateUrl: './parameters-monetization-page.component.html',
  styleUrl: './parameters-monetization-page.component.scss',
})
export class ParametersMonetizationPageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.monetization;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly draft = signal<ParametersMonetizationConfig | null>(null);
  readonly activeTab = signal('general');

  readonly tabs: RepTabItem[] = [
    { id: 'general', label: 'General', description: 'Facturación base' },
    { id: 'pricing', label: 'Pricing', description: 'Precios y multiplicadores' },
    { id: 'limits', label: 'Limits', description: 'Topes de uso' },
    { id: 'credits', label: 'Credits', description: 'Bolsas y rollover' },
    { id: 'marketing', label: 'Marketing Copy', description: 'Copy comercial' },
  ];

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.config) !== JSON.stringify(draft);
  });

  readonly canSave = computed(() => {
    const draft = this.draft();
    if (!draft) return false;
    return draft.general.defaultCurrency.trim() !== '' && draft.marketing.headline.trim() !== '';
  });

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.config));
    });
  }

  ngOnInit(): void {
    this.facade.loadMonetization();
  }

  refresh(): void {
    this.facade.loadMonetization();
  }

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.config));
  }

  save(): void {
    const draft = this.draft();
    if (!draft || !this.canSave()) return;
    this.facade.saveMonetization(structuredClone(draft));
  }

  patchGroup(group: keyof Omit<ParametersMonetizationConfig, 'plans'>, key: string, value: string | boolean | number): void {
    this.draft.update((draft) => {
      if (!draft) return draft;
      return {
        ...draft,
        [group]: {
          ...draft[group],
          [key]: value,
        },
      };
    });
  }

  asNumber(value: string): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  asText(value: number): string {
    return String(value);
  }
}
