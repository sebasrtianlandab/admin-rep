import { Component, input, output } from '@angular/core';
import { ThemeService } from '@core/theme/theme.service';
import { APP_SETTINGS } from '@core/config/app-settings';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';
import {
  RepBreadcrumbComponent,
  RepBreadcrumbItem,
} from '@shared/ui/navigation/rep-breadcrumb/rep-breadcrumb.component';

@Component({
  selector: 'app-app-topbar',
  imports: [RepIconsModule, RepBreadcrumbComponent],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss',
})
export class AppTopbarComponent {
  readonly menuClick = output<void>();
  readonly breadcrumbItems = input<RepBreadcrumbItem[]>([
    { label: 'Inicio', link: '/dashboard' },
    { label: 'Panel', link: '/dashboard' },
  ]);

  readonly brand = APP_SETTINGS;

  constructor(readonly theme: ThemeService) {}

  onMenu(): void {
    this.menuClick.emit();
  }

  onToggleTheme(): void {
    this.theme.toggle();
  }
}
