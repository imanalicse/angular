import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {FormAreaModule} from "./form-area/form-area.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormAreaModule,
        RouterModule.forRoot([
            {path: '', component: AppComponent}
        ]),
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
