import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-tooltip',
  imports: [],
  templateUrl: './rep-tooltip.component.html',
  styleUrl: './rep-tooltip.component.scss',
})
export class RepTooltipComponent {
  /** Tooltip text; when empty, projects only the trigger (no bubble). */
  readonly text = input('');
  /** Delay before show (purely visual; CSS-only hover). */
  readonly placement = input<'top' | 'bottom'>('top');
}
