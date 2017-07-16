import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormAreaRoutingModule} from "./form-area-routing.module";
import {FormAreaComponent} from "./form-area.component";
import {TemplateDrivenFormsComponent} from "./template-driven-forms/template-driven-forms.component";
import {ReactiveFormsComponent} from "./reactive-forms/reactive-forms.component";


@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        FormAreaRoutingModule
    ],
    declarations: [
        FormAreaComponent,
        TemplateDrivenFormsComponent,
        ReactiveFormsComponent
    ],
    providers: [],
    bootstrap: []
})
export class FormAreaModule {
}
