import {NgModule, Pipe} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormAreaRoutingModule} from "./form-area-routing.module";
import {FormAreaComponent} from "./form-area.component";
import {TemplateDrivenFormsComponent} from "./template-driven-forms/template-driven-forms.component";
import {ReactiveFormsComponent} from "./reactive-forms/reactive-forms.component";


@NgModule({
    imports: [
        FormsModule,
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
