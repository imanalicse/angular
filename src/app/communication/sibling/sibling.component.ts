import { Component, OnInit } from '@angular/core';
import {CommonService} from "app/services/common.service";

@Component({
  selector: 'app-sibling',
  templateUrl: './sibling.component.html',
  styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit {

  commonMessage: string;

  constructor(private commonService: CommonService) { }

  ngOnInit() {

    this.commonService.messageSource.subscribe(data=>{
        this.commonMessage = data;
    })
  }

  newMessage(){
    this.commonService.messageSource.next('BroadCast message from sibling using BehaviorSubject');
  }

}
