import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';

import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdInputModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdListModule } from '@angular2-material/list';
import { MdSliderModule } from '@angular2-material/slider';
import { MdMenuModule } from '@angular2-material/menu';
import { MdRadioModule } from '@angular/material';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdIconModule } from '@angular2-material/icon';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { DomainModule } from './domain/domain.module';
import { environment } from '../environments/environment';
import { AgentModule } from './agent/agent.module';
import { CustomerModule } from './customer/customer.module';

import { RootComponent } from './shared/layout/root/root.component';
import { AuthorizeCallbackComponent } from './authorize-callback.component';
import 'hammerjs';
import { NavigationService } from "./services/navigation.service";
import { BaseService } from "app/services/base.service";
import { ReliveriWebModule } from "./reliveri-web/reliveri-web.module";
import {AccountService} from "./services/account.service";
import {ForgotPasswordResetComponent} from "./forgot-password/forgot-password-reset/forgot-password-reset.component";
import {ForgrotPasswordConfirmationComponent} from "./forgot-password/forgot-password-confirmation/forgot-password-confirmation.component";
import {ForgrotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ForgotPasswordResetConfirmationComponent} from "./forgot-password/forgot-password-reset-confirmation/forgot-password-reset-confirmation.component";
import {UserAddressMapComponent} from "./user-address-map/user-address-map.component";
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AuthorizeCallbackComponent,
    RootComponent,
    ForgrotPasswordComponent,
    ForgrotPasswordConfirmationComponent,
    ForgotPasswordResetComponent,
    ForgotPasswordResetConfirmationComponent,
    UserAddressMapComponent,
  ],
  imports: [
    AdminModule,
    BrowserModule,
    CoreModule,
    DomainModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    ToastModule.forRoot(),
    AgentModule,
    CustomerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ReliveriWebModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD335lsOrDZwrHCQoW5J8-GHi5NjSqsvFY'
    })
  ],
  providers: [NavigationService, BaseService, AccountService],
  bootstrap: [RootComponent],
  exports: [HttpModule, FlexLayoutModule, FormsModule]
})
export class AppModule { }
