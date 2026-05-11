import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type {
  ParametersMarketplaceConfig,
  ParametersMarketplaceRules,
  ParametersMarketplaceStatus,
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
  selector: 'app-parameters-marketplace-page',
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
  templateUrl: './parameters-marketplace-page.component.html',
  styleUrl: './parameters-marketplace-page.component.scss',
})
export class ParametersMarketplacePageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.marketplace;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly draft = signal<ParametersMarketplaceConfig | null>(null);
  readonly selectedStatusId = signal<string | null>(null);

  readonly moderationOptions: RepSelectOption[] = [
    { value: 'manual', label: 'Manual' },
    { value: 'assisted', label: 'Asistida' },
    { value: 'automatic', label: 'Automática' },
  ];

  readonly iconOptions: RepSelectOption[] = [
    { value: 'help-circle', label: 'Help circle' },
    { value: 'alert-circle', label: 'Alert circle' },
    { value: 'activity', label: 'Activity' },
    { value: 'house', label: 'House' },
    { value: 'search', label: 'Search' },
    { value: 'x', label: 'X' },
  ];

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.config) !== JSON.stringify(draft);
  });

  readonly canSave = computed(() => {
    const status = this.selectedStatus();
    return !!this.draft() && !!status && status.label.trim() !== '' && status.color.trim() !== '';
  });

  readonly orderedStatuses = computed(() =>
    [...(this.draft()?.statuses ?? [])].sort((a, b) => a.order - b.order),
  );

  readonly selectedStatus = computed(() => {
    const id = this.selectedStatusId();
    return this.draft()?.statuses.find((item) => item.id === id) ?? null;
  });

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.config));
      const currentId = this.selectedStatusId();
      const firstId = snapshot.config.statuses[0]?.id ?? null;
      if (!currentId || !snapshot.config.statuses.some((item) => item.id === currentId)) {
        this.selectedStatusId.set(firstId);
      }
    });
  }

  ngOnInit(): void {
    this.facade.loadMarketplace();
  }

  refresh(): void {
    this.facade.loadMarketplace();
  }

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.config));
    this.selectedStatusId.set(snapshot.config.statuses[0]?.id ?? null);
  }

  save(): void {
    const draft = this.draft();
    if (!draft || !this.canSave()) return;
    this.facade.saveMarketplace(structuredClone(draft));
  }

  selectStatus(id: string): void {
    this.selectedStatusId.set(id);
  }

  patchStatus(id: string, patch: Partial<ParametersMarketplaceStatus>): void {
    this.draft.update((draft) =>
      draft
        ? {
            ...draft,
            statuses: draft.statuses.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          }
        : draft,
    );
  }

  patchRules<K extends keyof ParametersMarketplaceRules>(
    key: K,
    value: ParametersMarketplaceRules[K],
  ): void {
    this.draft.update((draft) =>
      draft ? { ...draft, rules: { ...draft.rules, [key]: value } } : draft,
    );
  }

  setModerationMode(value: string): void {
    if (value === 'manual' || value === 'assisted' || value === 'automatic') {
      this.patchRules('moderationMode', value);
    }
  }

  setStatusIcon(value: string): void {
    const status = this.selectedStatus();
    if (!status) return;
    this.patchStatus(status.id, { icon: value });
  }

  asNumber(value: string): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  asText(value: number): string {
    return String(value);
  }
}
