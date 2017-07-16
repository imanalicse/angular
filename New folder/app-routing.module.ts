import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './shared/layout/root/root.component';
import { AuthorizeCallbackComponent } from './authorize-callback.component';
import { OnlineShoppingTipsComponent } from "./reliveri-web/online-shopping-tips/online-shopping-tips.component";
import { AboutUsComponent } from "./reliveri-web/about-us/about-us.component";
import { ContactUsComponent } from "./reliveri-web/contact-us/contact-us.component";
import { TermsAndConditionComponent } from "./reliveri-web/terms-and-condition/terms-and-condition.component";
import { HomeComponent } from "app/reliveri-web/home/home.component";
import { ReliveriWebComponent } from "app/reliveri-web/reliveri-web.component";
import { LoginComponent } from "app/reliveri-web/login/login.component";
import {ForgrotPasswordConfirmationComponent} from "./forgot-password/forgot-password-confirmation/forgot-password-confirmation.component";
import {ForgrotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ForgotPasswordResetComponent} from "./forgot-password/forgot-password-reset/forgot-password-reset.component";
import {ForgotPasswordResetConfirmationComponent} from "./forgot-password/forgot-password-reset-confirmation/forgot-password-reset-confirmation.component";
import {UserAddressMapComponent} from "./user-address-map/user-address-map.component";
import {RegisterConfirmationComponent} from "./reliveri-web/register-confirmation/register-confirmation.component";
import {UnauthorizedComponent} from "./reliveri-web/unauthorized/unauthorized.component";

const appRoutes: Routes = [
    //{ path: 'authorize-callback', component: AuthorizeCallbackComponent },
    //{ path: '', redirectTo: '/authorize-callback', pathMatch: 'full' }
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration-confirmation/:userType', component: RegisterConfirmationComponent },
    { path: 'online-shopping-tips', component: OnlineShoppingTipsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'terms-and-condition', component: TermsAndConditionComponent },
    { path: 'forgotpassword', component: ForgrotPasswordComponent},
    { path: 'forgotpassword/confirmation', component: ForgrotPasswordConfirmationComponent},
    { path: 'reset-password/:hashValue', component: ForgotPasswordResetComponent},
    { path: 'resetpassword/confirmation', component: ForgotPasswordResetConfirmationComponent},
    { path: 'useraddress-map/:lat/:lng', component: UserAddressMapComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
