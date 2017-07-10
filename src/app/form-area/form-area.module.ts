import {NgModule} from "@angular/core";
import {FormAreaRoutingModule} from "./form-area-routing.module";
import {FormAreaComponent} from "./form-area.component";


@NgModule({
  imports: [
      FormAreaRoutingModule
  ],
  declarations: [
    FormAreaComponent
  ],
  providers: [],
  bootstrap: []
})
export class FormAreaModule { }
