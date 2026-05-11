import { Component } from '@angular/core';

/** Barra de herramientas de página (título + acciones). Alineada con `.rep-toolbar` en utilities. */
@Component({
  selector: 'app-rep-toolbar',
  imports: [],
  templateUrl: './rep-toolbar.component.html',
  styleUrl: './rep-toolbar.component.scss',
  host: {
    class: 'rep-toolbar',
  },
})
export class RepToolbarComponent {}
