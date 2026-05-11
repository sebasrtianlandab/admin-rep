import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

let repTextareaSeq = 0;

@Component({
  selector: 'app-rep-textarea',
  imports: [FormsModule],
  templateUrl: './rep-textarea.component.html',
  styleUrl: './rep-textarea.component.scss',
})
export class RepTextareaComponent {
  readonly value = model('');
  readonly label = input<string | null>(null);
  readonly placeholder = input('');
  readonly helperText = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly disabled = input(false);
  readonly rows = input(3);
  readonly fieldId = input(`rep-textarea-${++repTextareaSeq}`);

  readonly blurred = output<FocusEvent>();
  readonly focused = output<FocusEvent>();
}
