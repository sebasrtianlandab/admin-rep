import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'rep-admin-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** `true` = dark */
  readonly dark = signal(false);

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.dark.set(stored === 'dark' || (stored !== 'light' && prefersDark));
    this.applyClass();
  }

  toggle(): void {
    this.dark.update((v) => !v);
    this.applyClass();
  }

  private applyClass(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.classList.toggle('dark', this.dark());
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, this.dark() ? 'dark' : 'light');
    }
  }
}
