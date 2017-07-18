import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  showMessage: string = 'Test message';
  constructor() { }

  ngOnInit() {
  }

  onNotifyClick(message: string){
    this.showMessage = message;
  }

}
