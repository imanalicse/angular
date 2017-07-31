import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  showMessage: string = 'Test message';

  messageToChild: string;

  constructor() { }

  ngOnInit() {
    this.messageToChild = 'Hello World from Parent';
  }

  onNotifyClick(message: string){
    this.showMessage = message;
  }

}
