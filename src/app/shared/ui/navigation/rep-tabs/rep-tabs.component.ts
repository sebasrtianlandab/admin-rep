import { Component, input, model } from '@angular/core';

export interface RepTabItem {
  id: string;
  label: string;
  description?: string;
}

@Component({
  selector: 'app-rep-tabs',
  imports: [],
  templateUrl: './rep-tabs.component.html',
  styleUrl: './rep-tabs.component.scss',
})
export class RepTabsComponent {
  readonly tabs = input<RepTabItem[]>([]);
  readonly value = model('');

  select(id: string): void {
    this.value.set(id);
  }
}
