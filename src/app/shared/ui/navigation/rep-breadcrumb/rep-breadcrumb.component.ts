import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RepIconsModule } from '@shared/ui/icons/rep-icons.module';

/** Compatible con `RouterLink` (rutas relativas o segmentos). */
export type RepBreadcrumbLink = string | (string | number)[];

export interface RepBreadcrumbItem {
  label: string;
  link?: RepBreadcrumbLink;
}

@Component({
  selector: 'app-rep-breadcrumb',
  imports: [RouterLink, RepIconsModule],
  templateUrl: './rep-breadcrumb.component.html',
  styleUrl: './rep-breadcrumb.component.scss',
})
export class RepBreadcrumbComponent {
  readonly items = input<RepBreadcrumbItem[]>([]);
}
