import { Component, input } from '@angular/core';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

@Component({
  selector: 'app-rep-empty-state',
  imports: [RepIconsModule],
  templateUrl: './rep-empty-state.component.html',
  styleUrl: './rep-empty-state.component.scss',
})
export class RepEmptyStateComponent {
  /** Lucide icon name registered in RepIconsModule */
  readonly iconName = input<string | null>('inbox');
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
}
