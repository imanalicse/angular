import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TemplateDrivenFormsComponent } from './forms/template-driven-forms/template-driven-forms.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'forms/template-driven-forms',
        component: TemplateDrivenFormsComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    TemplateDrivenFormsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
