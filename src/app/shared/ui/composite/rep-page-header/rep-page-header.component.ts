import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-page-header',
  imports: [],
  templateUrl: './rep-page-header.component.html',
  styleUrl: './rep-page-header.component.scss',
})
export class RepPageHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly eyebrow = input<string | null>(null);
}
