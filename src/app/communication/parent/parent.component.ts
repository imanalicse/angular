import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  messageFormChild: string = '';

  messageToChild: string;

  constructor() { }

  ngOnInit() {
    this.messageToChild = 'Message from Parent';
  }

  receiveMessage($event){
    this.messageFormChild = $event;
  }

}
