import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
//import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdPaginatorModule, MdInputModule, MdTableModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import {AppComponent} from "./app.component";
import {FormAreaModule} from "./form-area/form-area.module";
import { MyPaginatorComponent } from './material/my-paginator/my-paginator.component';
import { TablePaginationExampleComponent } from './material/table-pagination-example/table-pagination-example.component';
import { ParentComponent } from './communication/parent/parent.component';
import { ChildComponent } from './communication/child/child.component';
import {CommonService} from "./services/common.service";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        HttpModule,
        FormAreaModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdPaginatorModule,
        MdTableModule,
        CdkTableModule,
        //HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: AppComponent},
            {path: 'pagination', component: MyPaginatorComponent},
            {path: 'table-pagination', component: TablePaginationExampleComponent},
            {path: 'communication/parent', component: ParentComponent}
        ]),
    ],
    declarations: [
        AppComponent,
        MyPaginatorComponent,
        TablePaginationExampleComponent,
        ParentComponent,
        ChildComponent
    ],
    providers: [CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
