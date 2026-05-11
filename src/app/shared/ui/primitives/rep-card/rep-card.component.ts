import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-card',
  imports: [],
  templateUrl: './rep-card.component.html',
  styleUrl: './rep-card.component.scss',
})
export class RepCardComponent {
  /** Optional title in header */
  readonly title = input<string | null>(null);
  /** Subtitle or description under title */
  readonly subtitle = input<string | null>(null);
  /** Legacy padding scale; prefer `compact` for dense ERP layouts */
  readonly padding = input<'sm' | 'md'>('md');
  /** Dense card (reduced padding + typography) */
  readonly compact = input(false);
}
