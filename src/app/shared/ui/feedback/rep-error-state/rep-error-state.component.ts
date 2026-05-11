import { Component, input } from '@angular/core';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

@Component({
  selector: 'app-rep-error-state',
  imports: [RepIconsModule],
  templateUrl: './rep-error-state.component.html',
  styleUrl: './rep-error-state.component.scss',
})
export class RepErrorStateComponent {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
}
