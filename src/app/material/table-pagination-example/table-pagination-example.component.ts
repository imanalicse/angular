import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import {Http} from "@angular/http";

import {CommonService} from "../../services/common.service";

@Component({
    selector: 'app-table-pagination-example',
    templateUrl: './table-pagination-example.component.html',
    styleUrls: ['./table-pagination-example.component.css']
})
export class TablePaginationExampleComponent implements OnInit {

    displayedColumns = ['userId', 'userName', 'Email'];
    myDatabase = null; //new MyDatabase();
    dataSource:MyDataSource;

    @ViewChild(MdPaginator)
    paginator:MdPaginator;

    constructor(private commonService:CommonService, private http:Http) {
        this.myDatabase = new MyDatabase(commonService);
    }

    ngOnInit():void {

        this.dataSource = new MyDataSource(this.myDatabase, this.paginator);
        //console.log(this.dataSource);
        console.log('myDatabase ', this.myDatabase);

    }

}

export interface UserData {
    id:any;
    name:string;
    email:string;
}


export class MyDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange:BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

    get data():UserData[] {
        return this.dataChange.value;
    }

    constructor(private commonService:CommonService) {

        this.commonService.getDataList().subscribe(resp => {

            const copiedData = this.data.slice();
            for (var i = 0; i < Object.keys(resp).length; i++) {
                copiedData.push(resp[i]);
                this.dataChange.next(copiedData);
            }

        });
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, MyDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class MyDataSource extends DataSource<any> {
    constructor(private _myDatabase:MyDatabase, private _paginator:MdPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect():Observable<UserData[]> {
        const displayDataChanges = [
            this._myDatabase.dataChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._myDatabase.data.slice();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    disconnect() {
    }
}
