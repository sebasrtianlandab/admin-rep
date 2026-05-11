import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersSectionsFacade } from '@features/parameters/application/parameters-sections.facade';
import type { ParametersIntegrationItem } from '@features/parameters/domain/parameters-sections.models';
import { RepConfirmDialogComponent } from '@shared/ui/composite/rep-confirm-dialog/rep-confirm-dialog.component';
import { RepBadgeComponent } from '@shared/ui/primitives/rep-badge/rep-badge.component';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepInputComponent } from '@shared/ui/primitives/rep-input/rep-input.component';
import { RepTextareaComponent } from '@shared/ui/primitives/rep-textarea/rep-textarea.component';
import { RepSwitchComponent } from '@shared/ui/primitives/rep-switch/rep-switch.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepPageContainerComponent } from '@shared/ui/layout/rep-page-container/rep-page-container.component';
import { RepSectionComponent } from '@shared/ui/layout/rep-section/rep-section.component';
import { RepToolbarComponent } from '@shared/ui/composite/rep-toolbar/rep-toolbar.component';
import { RepPageHeaderComponent } from '@shared/ui/composite/rep-page-header/rep-page-header.component';
import { RepErrorStateComponent } from '@shared/ui/feedback/rep-error-state/rep-error-state.component';

@Component({
  selector: 'app-parameters-integrations-page',
  imports: [
    DatePipe,
    RouterLink,
    RepIconsModule,
    RepConfirmDialogComponent,
    RepBadgeComponent,
    RepButtonComponent,
    RepCardComponent,
    RepInputComponent,
    RepTextareaComponent,
    RepSwitchComponent,
    RepPageContainerComponent,
    RepSectionComponent,
    RepToolbarComponent,
    RepPageHeaderComponent,
    RepErrorStateComponent,
  ],
  templateUrl: './parameters-integrations-page.component.html',
  styleUrl: './parameters-integrations-page.component.scss',
})
export class ParametersIntegrationsPageComponent implements OnInit {
  private readonly facade = inject(ParametersSectionsFacade);

  readonly data = this.facade.integrations;
  readonly loading = this.facade.loading;
  readonly saving = this.facade.saving;
  readonly error = this.facade.error;
  readonly draft = signal<ParametersIntegrationItem[] | null>(null);
  readonly selectedId = signal<string | null>(null);
  readonly rotateDialogOpen = signal(false);

  ngOnInit(): void {
    this.facade.loadIntegrations();
  }

  constructor() {
    effect(() => {
      const snapshot = this.data();
      if (!snapshot) return;
      this.draft.set(structuredClone(snapshot.items));
      const current = this.selectedId();
      if (!current || !snapshot.items.some((item) => item.id === current)) {
        this.selectedId.set(snapshot.items[0]?.id ?? null);
      }
    });
  }

  refresh(): void {
    this.facade.loadIntegrations();
  }

  readonly dirty = computed(() => {
    const snap = this.data();
    const draft = this.draft();
    return !!snap && !!draft && JSON.stringify(snap.items) !== JSON.stringify(draft);
  });

  readonly selected = computed(() => {
    const id = this.selectedId();
    return this.draft()?.find((item) => item.id === id) ?? null;
  });

  resetDraft(): void {
    const snapshot = this.data();
    if (!snapshot) return;
    this.draft.set(structuredClone(snapshot.items));
    this.selectedId.set(snapshot.items[0]?.id ?? null);
  }

  save(): void {
    const items = this.draft();
    if (!items) return;
    this.facade.saveIntegrations(structuredClone(items));
  }

  selectIntegration(id: string): void {
    this.selectedId.set(id);
  }

  patchSelected(patch: Partial<ParametersIntegrationItem>): void {
    const id = this.selectedId();
    if (!id) return;
    this.draft.update((items) =>
      items ? items.map((item) => (item.id === id ? { ...item, ...patch } : item)) : items,
    );
  }

  openRotateDialog(): void {
    this.rotateDialogOpen.set(true);
  }

  confirmRotate(): void {
    const item = this.selected();
    if (!item) return;
    const suffix = String(Date.now()).slice(-4);
    this.patchSelected({
      lastFour: suffix,
      lastRotated: new Date().toISOString(),
      status: item.status === 'Pendiente' ? 'Configurado' : item.status,
    });
  }

  stateVariant(state: string): 'success' | 'warning' | 'neutral' | 'outline' {
    if (state === 'Activo' || state === 'Configurado') return 'success';
    if (state === 'Sandbox') return 'warning';
    return 'neutral';
  }
}
