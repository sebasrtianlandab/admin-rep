import { Component } from '@angular/core';

/** Max-width page column; horizontal padding comes from shell (`main.rep-page-spacing`). */
@Component({
  selector: 'app-rep-page-container',
  imports: [],
  template: '<ng-content />',
  host: {
    class: 'rep-page-container',
  },
})
export class RepPageContainerComponent {}
