import { Component, computed, input } from '@angular/core';

export type RepSkeletonVariant = 'text' | 'card' | 'avatar' | 'table-row';

@Component({
  selector: 'app-rep-skeleton',
  imports: [],
  templateUrl: './rep-skeleton.component.html',
  styleUrl: './rep-skeleton.component.scss',
})
export class RepSkeletonComponent {
  readonly variant = input<RepSkeletonVariant>('text');
  /** Lines for `text` variant */
  readonly lines = input(1);

  readonly lineIndices = computed(() =>
    Array.from({ length: Math.max(0, this.lines()) }, (_, i) => i),
  );
}
