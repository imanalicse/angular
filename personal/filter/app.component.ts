import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>

    <input type="text" [(ngModel)]="filterargs">

    <ul>
      <li *ngFor="let item of items | myfilter:filterargs">{{item.title}}</li>
    </ul>
  `,
})
export class AppComponent  {
  name = 'Angular';

  filterargs = 'hello';
  items = [
    {title: 'hello world'},
    {title: 'hello kitty'},
    {title: 'foo bar'}
  ];
}
