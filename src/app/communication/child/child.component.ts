import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CommonService} from "app/services/common.service";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() messageFromParent: string;
  @Output() messageEvent = new EventEmitter<string>();

  message: string = "Message from child using @ViewChild decorator";
  commonMessage: string;

  constructor(private commonService: CommonService) { }

  ngOnInit() {

    this.commonService.messageSource.subscribe(data=>{
      this.commonMessage = data;
    })
  }

  sendMessage(){
    this.messageEvent.emit("Message from child using @Output decorator and EventEmitter");
  }
}
