import { Component, input } from '@angular/core';
import { RepCardComponent } from '@shared/ui/primitives/rep-card/rep-card.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

@Component({
  selector: 'app-dashboard-chart-panel',
  imports: [RepCardComponent, RepIconsModule],
  templateUrl: './dashboard-chart-panel.component.html',
  styleUrl: './dashboard-chart-panel.component.scss',
})
export class DashboardChartPanelComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();

  /** Illustrative bar heights (%) for placeholder chart */
  readonly barHeights = [35, 52, 44, 61, 48, 70, 55, 63, 42, 58, 49, 66];
}
