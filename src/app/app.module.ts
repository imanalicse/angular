import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {AppComponent} from './app.component';
import {TemplateDrivenFormsComponent} from './form-area/template-driven-forms/template-driven-forms.component';
import {ReactiveFormsComponent} from './form-area/reactive-forms/reactive-forms.component';
import {FormAreaModule} from "./form-area/form-area.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        FormAreaModule,
        /*RouterModule.forRoot([
            {path: 'forms/template-driven-forms', component: TemplateDrivenFormsComponent},
            {path: 'forms/reactive-forms', component: ReactiveFormsComponent}
        ]),*/
    ],
    declarations: [
        AppComponent,
        TemplateDrivenFormsComponent,
        ReactiveFormsComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
