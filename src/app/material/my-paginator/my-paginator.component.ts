import { Component, OnInit, OnChanges } from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-my-paginator',
  templateUrl: './my-paginator.component.html',
  styleUrls: ['./my-paginator.component.css']
})
export class MyPaginatorComponent implements OnInit {

  // MdPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // custom
  offset = 0;

  // MdPaginator Output
  pageEvent: PageEvent;

  constructor() { }

  ngOnInit() {
  }



  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageEvent(options){

    console.log(options);
    
    //console.log('offset ', this.offset);
  }


}
