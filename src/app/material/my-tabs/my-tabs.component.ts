import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tabs',
  templateUrl: './my-tabs.component.html',
  styleUrls: ['./my-tabs.component.css']
})
export class MyTabsComponent implements OnInit {

  selectedIndex;
  constructor() { }

  ngOnInit() {
  }

  CustomTabChange($event){
      console.log($event)
  }

  nextPreviousTab(index: number){
    console.log(index);
    var element = document.getElementById('md-tab-label-0-'+index);
    element.click();
  }
}
