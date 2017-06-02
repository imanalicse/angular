import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <ul>
        <li routerLink="/">Home</li>
        <li routerLink="/about">About</li>
    </ul>
    <hr />
    <router-outlet></router-outlet>
        `,
})
export class AppComponent  {
}
