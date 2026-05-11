import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type { ParametersBrandingConfig } from '@features/parameters/domain/parameters-sections.models';
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
  selector: 'app-parameters-branding-page',
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
  templateUrl: './parameters-branding-page.component.html',
  styleUrl: './parameters-branding-page.component.scss',
})
export class ParametersBrandingPageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.branding;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly draft = signal<ParametersBrandingConfig | null>(null);

  readonly radiusOptions: RepSelectOption[] = [
    { value: 'soft', label: 'Soft' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'sharp', label: 'Sharp' },
  ];

  readonly densityOptions: RepSelectOption[] = [
    { value: 'compact', label: 'Compacta' },
    { value: 'comfortable', label: 'Comfortable' },
  ];

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.config) !== JSON.stringify(draft);
  });

  readonly canSave = computed(() => {
    const draft = this.draft();
    if (!draft) return false;
    return draft.appName.trim() !== '' && draft.shortName.trim() !== '';
  });

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.config));
    });
  }

  ngOnInit(): void {
    this.facade.loadBranding();
  }

  refresh(): void {
    this.facade.loadBranding();
  }

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.config));
  }

  save(): void {
    const draft = this.draft();
    if (!draft || !this.canSave()) return;
    this.facade.saveBranding(structuredClone(draft));
  }

  patch<K extends keyof ParametersBrandingConfig>(key: K, value: ParametersBrandingConfig[K]): void {
    this.draft.update((draft) => (draft ? { ...draft, [key]: value } : draft));
  }

  setRadiusPreset(value: string): void {
    if (value === 'soft' || value === 'balanced' || value === 'sharp') {
      this.patch('radiusPreset', value);
    }
  }

  setDensityPreset(value: string): void {
    if (value === 'compact' || value === 'comfortable') {
      this.patch('densityPreset', value);
    }
  }
}
