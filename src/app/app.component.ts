import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid pt-3">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
