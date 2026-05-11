import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

let repInputSeq = 0;

@Component({
  selector: 'app-rep-input',
  imports: [FormsModule],
  templateUrl: './rep-input.component.html',
  styleUrl: './rep-input.component.scss',
})
export class RepInputComponent {
  readonly value = model('');
  readonly label = input<string | null>(null);
  readonly placeholder = input('');
  readonly helperText = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly disabled = input(false);
  readonly type = input<'text' | 'email' | 'password' | 'number' | 'search'>('text');
  readonly autocomplete = input<string | null>(null);
  /** Sin borde propio: para compuestos (p. ej. barra de filtros) que aportan el chrome exterior. */
  readonly embedded = input(false);
  readonly fieldId = input(`rep-input-${++repInputSeq}`);

  readonly blurred = output<FocusEvent>();
  readonly focused = output<FocusEvent>();
}
