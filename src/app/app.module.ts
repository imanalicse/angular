import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MdPaginatorModule} from '@angular/material';

import {AppComponent} from "./app.component";
import {FormAreaModule} from "./form-area/form-area.module";
import { MyPaginatorComponent } from './material/my-paginator/my-paginator.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormAreaModule,
        RouterModule.forRoot([
            {path: '', component: AppComponent},
            {path: 'pagination', component: MyPaginatorComponent}
        ]),
    ],
    declarations: [
        AppComponent,
        MyPaginatorComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
