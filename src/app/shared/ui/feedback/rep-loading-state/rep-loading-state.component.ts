import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rep-loading-state',
  imports: [],
  templateUrl: './rep-loading-state.component.html',
  styleUrl: './rep-loading-state.component.scss',
})
export class RepLoadingStateComponent {
  /** Shown when no projected content */
  readonly message = input<string | null>(null);
}
