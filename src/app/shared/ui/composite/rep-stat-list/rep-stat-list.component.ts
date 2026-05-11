import { Component, input } from '@angular/core';

export interface RepStatListItem {
  label: string;
  value: string;
  hint?: string | null;
}

@Component({
  selector: 'app-rep-stat-list',
  imports: [],
  templateUrl: './rep-stat-list.component.html',
  styleUrl: './rep-stat-list.component.scss',
})
export class RepStatListComponent {
  readonly items = input<RepStatListItem[]>([]);
  readonly compact = input(false);
}
