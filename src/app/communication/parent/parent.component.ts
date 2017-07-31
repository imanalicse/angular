import { Component, OnInit, ViewChild } from '@angular/core';
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  messageFormChild: string = '';
  messageToChild: string;

  viewMessage: string = "Hello World";

  @ViewChild(ChildComponent) child: ChildComponent;

  constructor() { }

  ngOnInit() {
    this.messageToChild = 'Message from Parent';
    this.viewMessage = this.child.message;
  }

  receiveMessage($event){
    this.messageFormChild = $event;
  }

}
