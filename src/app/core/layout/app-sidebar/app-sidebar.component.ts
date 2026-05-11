import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_SETTINGS } from '@core/config/app-settings';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import { RepAvatarComponent } from '@shared/ui/primitives/rep-avatar/rep-avatar.component';

export interface ShellNavItem {
  label: string;
  route: string;
  icon: string;
  disabled?: boolean;
}

export interface ShellNavSection {
  label: string;
  items: ShellNavItem[];
}

export interface ShellUserProfile {
  name: string;
  subtitle: string;
  avatarSrc: string | null;
}

@Component({
  selector: 'app-app-sidebar',
  imports: [RouterLink, RouterLinkActive, RepIconsModule, NgOptimizedImage, RepAvatarComponent],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss',
})
export class AppSidebarComponent {
  readonly sections = input<ShellNavSection[]>([]);
  readonly user = input.required<ShellUserProfile>();
  readonly collapsed = input(false);
  readonly closeMobile = output<void>();

  readonly brand = APP_SETTINGS;

  onNavigate(): void {
    this.closeMobile.emit();
  }
}
