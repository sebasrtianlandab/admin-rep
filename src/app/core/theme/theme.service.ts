import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'rep-admin-theme';
export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>('system');
  private readonly systemPrefersDark = signal(false);
  readonly dark = computed(() => {
    const mode = this.mode();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return this.systemPrefersDark();
  });
  private readonly mediaQuery =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  private readonly handleSystemThemeChange = (event: MediaQueryListEvent) => {
    this.systemPrefersDark.set(event.matches);
    if (this.mode() === 'system') {
      this.applyClass();
    }
  };

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const storedMode = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';

    this.systemPrefersDark.set(this.mediaQuery?.matches ?? false);
    this.mode.set(storedMode);
    this.mediaQuery?.addEventListener('change', this.handleSystemThemeChange);
    this.applyClass();
  }

  toggle(): void {
    this.setMode(this.dark() ? 'light' : 'dark');
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.applyClass();
  }

  private applyClass(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.classList.toggle('dark', this.dark());
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, this.mode());
    }
  }
}
