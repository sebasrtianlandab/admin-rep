import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-section',
  imports: [],
  templateUrl: './rep-section.component.html',
  styleUrl: './rep-section.component.scss',
})
export class RepSectionComponent {
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly title = input<string | null>(null);
  readonly subtitle = input<string | null>(null);
}
