import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-divider',
  imports: [],
  templateUrl: './rep-divider.component.html',
  styleUrl: './rep-divider.component.scss',
})
export class RepDividerComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}
