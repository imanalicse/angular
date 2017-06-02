import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import { UserComponent }  from './component/user.component';
import { AboutComponent }  from './component/about.component';
import { routing } from './app.routing';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, UserComponent, AboutComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
