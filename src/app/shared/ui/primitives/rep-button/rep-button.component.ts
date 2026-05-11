import { Component, computed, input, output } from '@angular/core';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

export type RepButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
export type RepButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  selector: 'app-rep-button',
  imports: [RepIconsModule],
  templateUrl: './rep-button.component.html',
  styleUrl: './rep-button.component.scss',
})
export class RepButtonComponent {
  readonly variant = input<RepButtonVariant>('primary');
  readonly size = input<RepButtonSize>('md');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit'>('button');
  readonly iconOnly = input(false);
  /** Accesibilidad (p. ej. botones solo icono). */
  readonly ariaLabel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  readonly btnClass = computed(() => {
    const v = this.variant();
    const io = this.iconOnly();
    const s = io ? 'icon' : this.size();
    const base = ['rep-btn', `rep-btn--${v}`, `rep-btn--size-${s}`];
    if (this.loading()) base.push('rep-btn--loading');
    if (this.disabled() || this.loading()) base.push('rep-btn--disabled');
    return base.join(' ');
  });

  onClick(ev: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.clicked.emit(ev);
  }
}
