import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent, ShellNavItem } from '@core/layout/app-sidebar/app-sidebar.component';
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

  readonly navItems: ShellNavItem[] = [
    { label: 'Panel de control', route: '/dashboard', icon: 'layout-dashboard' },
    { label: 'Propiedades', route: '/properties', icon: 'building-2' },
    { label: 'Servicios', route: '/services', icon: 'briefcase' },
    { label: 'Usuarios', route: '/users', icon: 'users' },
    { label: 'Empresas', route: '/companies', icon: 'landmark' },
    { label: 'Pagos', route: '/payments', icon: 'receipt' },
    { label: 'Soporte', route: '/support', icon: 'life-buoy' },
    { label: 'Parámetros', route: '/parameters', icon: 'sliders-horizontal' },
    { label: 'Auditoría', route: '/audit', icon: 'clipboard-list' },
  ];

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
