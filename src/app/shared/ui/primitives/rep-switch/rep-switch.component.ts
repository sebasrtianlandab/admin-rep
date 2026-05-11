import { Component, input, model } from '@angular/core';

let repSwitchSeq = 0;

@Component({
  selector: 'app-rep-switch',
  imports: [],
  templateUrl: './rep-switch.component.html',
  styleUrl: './rep-switch.component.scss',
})
export class RepSwitchComponent {
  readonly checked = model(false);
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly disabled = input(false);
  readonly fieldId = input(`rep-switch-${++repSwitchSeq}`);

  onChange(ev: Event): void {
    const target = ev.target as HTMLInputElement | null;
    this.checked.set(!!target?.checked);
  }
}
