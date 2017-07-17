import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule, HttpClientModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdPaginatorModule, MdInputModule} from '@angular/material';

import {AppComponent} from "./app.component";
import {FormAreaModule} from "./form-area/form-area.module";
import { MyPaginatorComponent } from './material/my-paginator/my-paginator.component';
import { TablePaginationExampleComponent } from './material/table-pagination-example/table-pagination-example.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        HttpModule,
        FormAreaModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdPaginatorModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: AppComponent},
            {path: 'pagination', component: MyPaginatorComponent},
            {path: 'table-pagination', component: TablePaginationExampleComponent}
        ]),
    ],
    declarations: [
        AppComponent,
        MyPaginatorComponent,
        TablePaginationExampleComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
