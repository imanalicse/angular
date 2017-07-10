import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TemplateDrivenFormsComponent} from "./template-driven-forms/template-driven-forms.component";
import {ReactiveFormsComponent} from "./reactive-forms/reactive-forms.component";
import {FormAreaComponent} from "./form-area.component";


const formAreaRoutes: Routes = [{
  path: 'forms', component:FormAreaComponent,
  children: [
    { path: 'template-driven-forms', component: TemplateDrivenFormsComponent },
    { path: 'reactive-forms', component: ReactiveFormsComponent },

    { path: '', component: FormAreaComponent }
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(formAreaRoutes)
  ],
  declarations: [],
  providers: []
})
export class FormAreaRoutingModule { }
