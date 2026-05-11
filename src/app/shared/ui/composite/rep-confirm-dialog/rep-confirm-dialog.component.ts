import { Component, ElementRef, effect, input, model, output, viewChild } from '@angular/core';
import { RepButtonComponent } from '@shared/ui/primitives/rep-button/rep-button.component';

@Component({
  selector: 'app-rep-confirm-dialog',
  imports: [RepButtonComponent],
  templateUrl: './rep-confirm-dialog.component.html',
  styleUrl: './rep-confirm-dialog.component.scss',
})
export class RepConfirmDialogComponent {
  private readonly dlg = viewChild<ElementRef<HTMLDialogElement>>('dlg');

  readonly open = model(false);
  readonly titleText = input('Confirmar');
  readonly messageText = input('');
  readonly confirmLabel = input('Confirmar');
  readonly cancelLabel = input('Cancelar');
  readonly confirmVariant = input<'primary' | 'danger'>('primary');

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  constructor() {
    effect(() => {
      const shouldOpen = this.open();
      const el = this.dlg()?.nativeElement;
      if (!el) return;
      if (shouldOpen) {
        if (!el.open) {
          queueMicrotask(() => {
            void el.showModal();
          });
        }
      } else if (el.open) {
        el.close();
      }
    });
  }

  onDialogClick(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) {
      this.onCancel();
    }
  }

  onEsc(ev: Event): void {
    ev.preventDefault();
    this.onCancel();
  }

  onConfirm(): void {
    this.confirmed.emit();
    this.open.set(false);
  }

  onCancel(): void {
    this.cancelled.emit();
    this.open.set(false);
  }
}
