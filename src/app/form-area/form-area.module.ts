import {NgModule} from "@angular/core";
import {FormAreaRoutingModule} from "./form-area-routing.module";
import {FormAreaComponent} from "./form-area.component";
import {TemplateDrivenFormsComponent} from "./template-driven-forms/template-driven-forms.component";
import {ReactiveFormsComponent} from "./reactive-forms/reactive-forms.component";


@NgModule({
    imports: [
        FormAreaRoutingModule,
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
