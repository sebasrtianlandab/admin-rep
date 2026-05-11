import { Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { ThemeMode, ThemeService } from '@core/theme/theme.service';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

@Component({
  selector: 'app-app-topbar',
  imports: [RepIconsModule],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss',
})
export class AppTopbarComponent {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly menuClick = output<void>();
  readonly toggleSidebar = output<void>();
  readonly collapsed = input(false);
  readonly themeMenuOpen = signal(false);
  readonly themeOptions: ReadonlyArray<{ value: ThemeMode; label: string; icon: string }> = [
    { value: 'light', label: 'Claro', icon: 'sun' },
    { value: 'dark', label: 'Oscuro', icon: 'moon' },
    { value: 'system', label: 'Sistema', icon: 'monitor' },
  ];

  constructor(readonly theme: ThemeService) {}

  onMenu(): void {
    this.menuClick.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleThemeMenu(): void {
    this.themeMenuOpen.update((open) => !open);
  }

  setTheme(mode: ThemeMode): void {
    this.theme.setMode(mode);
    this.themeMenuOpen.set(false);
  }

  themeIcon(): string {
    const mode = this.theme.mode();
    if (mode === 'system') return 'monitor';
    return mode === 'dark' ? 'moon' : 'sun';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.themeMenuOpen()) return;
    if (this.host.nativeElement.contains(event.target as Node | null)) return;
    this.themeMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.themeMenuOpen.set(false);
  }
}
