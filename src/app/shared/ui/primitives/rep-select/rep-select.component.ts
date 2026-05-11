import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface RepSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let repSelectSeq = 0;

@Component({
  selector: 'app-rep-select',
  imports: [FormsModule],
  templateUrl: './rep-select.component.html',
  styleUrl: './rep-select.component.scss',
})
export class RepSelectComponent {
  readonly value = model<string>('');
  readonly options = input<RepSelectOption[]>([]);
  readonly label = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly disabled = input(false);
  readonly fieldId = input(`rep-select-${++repSelectSeq}`);

  readonly blurred = output<FocusEvent>();
  readonly focused = output<FocusEvent>();
}
