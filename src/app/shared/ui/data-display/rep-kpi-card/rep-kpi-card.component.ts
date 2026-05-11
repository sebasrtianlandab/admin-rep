import { Component, input } from '@angular/core';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

@Component({
  selector: 'app-rep-kpi-card',
  imports: [RepIconsModule],
  templateUrl: './rep-kpi-card.component.html',
  styleUrl: './rep-kpi-card.component.scss',
})
export class RepKpiCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly hint = input<string | null>(null);
  readonly iconName = input<string>('activity');
  readonly loading = input(false);
  readonly trendLabel = input<string | null>(null);
  readonly trendPositive = input<boolean | null>(null);
}
