import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametersHubFacade } from '@features/parameters/application/parameters-hub.facade';
import type { ParametersHubCard, ParametersHubRisk } from '@features/parameters/domain/parameters-hub.models';
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

  readonly snapshot = this.facade.snapshot;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;

  ngOnInit(): void {
    this.facade.load();
  }

  refresh(): void {
    this.facade.refresh();
  }

  riskVariant(risk: ParametersHubRisk): 'success' | 'neutral' | 'warning' | 'danger' | 'outline' {
    switch (risk) {
      case 'Bajo':
        return 'success';
      case 'Medio':
        return 'neutral';
      case 'Alto':
        return 'warning';
      case 'Crítico':
        return 'danger';
      default:
        return 'outline';
    }
  }

  trackById(_: number, card: ParametersHubCard): string {
    return card.id;
  }
}
