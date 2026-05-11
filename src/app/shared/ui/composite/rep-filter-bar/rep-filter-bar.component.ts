import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepInputComponent } from '@shared/ui/primitives/rep-input/rep-input.component';

@Component({
  selector: 'app-rep-filter-bar',
  imports: [FormsModule, RepInputComponent, RepButtonComponent, RepIconsModule],
  templateUrl: './rep-filter-bar.component.html',
  styleUrl: './rep-filter-bar.component.scss',
})
export class RepFilterBarComponent {
  readonly searchLabel = input<string | null>(null);
  readonly searchPlaceholder = input('Buscar…');
  readonly search = model('');
  readonly showReset = input(true);
  readonly resetDisabled = input(true);

  readonly reset = output<void>();
}
