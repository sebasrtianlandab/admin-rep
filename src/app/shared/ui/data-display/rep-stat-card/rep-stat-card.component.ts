import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-stat-card',
  imports: [],
  templateUrl: './rep-stat-card.component.html',
  styleUrl: './rep-stat-card.component.scss',
})
export class RepStatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly hint = input<string | null>(null);
  readonly compact = input(false);
}
