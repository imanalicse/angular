import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() messageFromParent: string;
  @Output() messageEvent = new EventEmitter<string>();

  message: string = "Message from child using @ViewChild decorator";

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    this.messageEvent.emit("Message from child using @Output decorator and EventEmitter");
  }
}
