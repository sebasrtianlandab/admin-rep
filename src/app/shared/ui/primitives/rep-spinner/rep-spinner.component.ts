import { Component, input } from '@angular/core';

export type RepSpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-rep-spinner',
  imports: [],
  templateUrl: './rep-spinner.component.html',
  styleUrl: './rep-spinner.component.scss',
})
export class RepSpinnerComponent {
  readonly size = input<RepSpinnerSize>('md');
  readonly label = input('Cargando');
}
