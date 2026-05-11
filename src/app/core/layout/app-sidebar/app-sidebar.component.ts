import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_SETTINGS } from '@core/config/app-settings';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

export interface ShellNavItem {
  label: string;
  route: string;
  icon: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-app-sidebar',
  imports: [RouterLink, RouterLinkActive, RepIconsModule, NgOptimizedImage],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss',
})
export class AppSidebarComponent {
  readonly items = input<ShellNavItem[]>([]);
  readonly collapsed = input(false);
  readonly closeMobile = output<void>();
  readonly toggleCollapse = output<void>();

  readonly brand = APP_SETTINGS;

  onNavigate(): void {
    this.closeMobile.emit();
  }
}
