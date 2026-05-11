import { Component, input } from '@angular/core';

export type RepBadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'destructive'
  | 'outline'
  | 'info'
  | 'neutral'
  | 'pending';

@Component({
  selector: 'app-rep-badge',
  imports: [],
  templateUrl: './rep-badge.component.html',
  styleUrl: './rep-badge.component.scss',
})
export class RepBadgeComponent {
  readonly label = input.required<string>();
  readonly variant = input<RepBadgeVariant>('default');
}
