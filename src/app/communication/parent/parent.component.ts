import { Component, OnInit, ViewChild } from '@angular/core';
import {ChildComponent} from "../child/child.component";
import { CommonService } from "app/services/common.service";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  messageFormChild: string = '';
  messageToChild: string;

  viewMessage: string = "Hello World";
  commonMessage: string = '';

  @ViewChild(ChildComponent) child: ChildComponent;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.messageToChild = 'Message from Parent';
    this.viewMessage = this.child.message;

    // BehaviorSubject    
    this.commonService.messageSource.subscribe(data=>{
      this.commonMessage = data;
    });

  }

  receiveMessage($event){
    this.messageFormChild = $event;
  }

}
