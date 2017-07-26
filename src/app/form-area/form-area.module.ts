import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {MaterialModule, MdDatepickerModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS} from '@angular/material';

import {FormAreaRoutingModule} from "./form-area-routing.module";
import {FormAreaComponent} from "./form-area.component";
import {TemplateDrivenFormsComponent} from "./template-driven-forms/template-driven-forms.component";
import {ReactiveFormsComponent, APP_DATE_FORMATS, AppDateAdapter} from "./reactive-forms/reactive-forms.component";


@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormAreaRoutingModule,
        MaterialModule,
        MdNativeDateModule,
        MdDatepickerModule
    ],
    declarations: [
        FormAreaComponent,
        TemplateDrivenFormsComponent,
        ReactiveFormsComponent
    ],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ],
    bootstrap: []
})
export class FormAreaModule {
}
