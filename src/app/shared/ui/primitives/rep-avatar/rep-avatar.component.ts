import { Component, computed, input } from '@angular/core';

export type RepAvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-rep-avatar',
  imports: [],
  templateUrl: './rep-avatar.component.html',
  styleUrl: './rep-avatar.component.scss',
})
export class RepAvatarComponent {
  readonly label = input.required<string>();
  readonly src = input<string | null>(null);
  readonly alt = input('');
  readonly size = input<RepAvatarSize>('md');

  readonly initials = computed(() => {
    const parts = this.label()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });
}
