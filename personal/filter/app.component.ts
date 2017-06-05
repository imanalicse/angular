import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
        <h1>{{name}}</h1>
        
        <input type="text" [(ngModel)]="searchItem">
        <ul>
          <li *ngFor="let item of items | myfilter:searchItem">{{item.title}} <br>{{item.phone}} </li>
        </ul>
    `,
})
export class AppComponent  {

  name = 'Angular';

  searchItem = '';
  items = [
    {
      title: 'hello Iman',
      phone:'01913010534'
    },
    {
      title: 'hello Atiqul bhai',
      phone:'01725789'
    },
    {
      title: 'foo bar',
      phone:'017535752'
    }
  ];

}
