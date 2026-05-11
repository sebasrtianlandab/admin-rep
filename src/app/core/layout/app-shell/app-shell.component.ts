import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AppSidebarComponent,
  ShellNavSection,
  ShellUserProfile,
} from '@core/layout/app-sidebar/app-sidebar.component';
import { AppTopbarComponent } from '@core/layout/app-topbar/app-topbar.component';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, AppSidebarComponent, AppTopbarComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  host: {
    class: 'block h-dvh min-h-0 overflow-hidden',
  },
})
export class AppShellComponent {
  readonly mobileNavOpen = signal(false);
  readonly sidebarCollapsed = signal(false);

  readonly navSections: ShellNavSection[] = [
    {
      label: 'Principal',
      items: [{ label: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard' }],
    },
    {
      label: 'Marketplace',
      items: [
        { label: 'Propiedades', route: '/properties', icon: 'building-2' },
        { label: 'Servicios', route: '/services', icon: 'briefcase' },
      ],
    },
    {
      label: 'Operación',
      items: [
        { label: 'Usuarios', route: '/users', icon: 'users' },
        { label: 'Empresas', route: '/companies', icon: 'landmark' },
        { label: 'Pagos', route: '/payments', icon: 'receipt' },
      ],
    },
    {
      label: 'Configuración',
      items: [{ label: 'Parámetros', route: '/parameters', icon: 'sliders-horizontal' }],
    },
    {
      label: 'Soporte y control',
      items: [
        { label: 'Soporte', route: '/support', icon: 'life-buoy' },
        { label: 'Auditoría', route: '/audit', icon: 'clipboard-list' },
      ],
    },
  ];

  readonly shellUser: ShellUserProfile = {
    name: 'Sebastian Landa',
    subtitle: 'Asesor inmobiliario',
    avatarSrc: null,
  };

  openMobileNav(): void {
    this.mobileNavOpen.set(true);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  toggleSidebarCollapsed(): void {
    this.sidebarCollapsed.update((v) => !v);
  }
}
