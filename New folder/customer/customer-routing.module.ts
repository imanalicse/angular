import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {CustomerComponent} from "./customer.component";
import {CustomerRoutingGuardService} from "./customer-routing-guard.service";
import {CoreModule} from "../core/core.module";
import {CustomerLoginComponent} from "./customer-login/customer-login.component";
import {CustomerProfileComponent} from "app/customer/customer-profile/customer-profile.component";
import {CustomerDashboardComponent} from "app/customer/customer-dashboard/customer-dashboard.component";
import {NavigationService} from "app/services/navigation.service";
import {MyParcelsComponent} from "app/customer/my-parcels/my-parcels.component";
import {ReceiveParcelsComponent} from "./receive-parcels/receive-parcels.component";

const customerRoutes:Routes = [{
    path: 'customer', component: CustomerDashboardComponent,
    //canActivateChild: [IdentityService],
    canActivate: [CustomerRoutingGuardService],
    children: [
        // { path: 'dashboard', component: CustomerDashboardComponent },
        {path: 'profile', component: CustomerProfileComponent},
        {path: 'my-parcels', component: MyParcelsComponent,},
        {path: 'receive-parcels', component: ReceiveParcelsComponent,},
        {path: '', component: CustomerComponent}
    ]
},
    {path: 'customer/login', component: CustomerLoginComponent}];

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(customerRoutes)
    ],
    providers: [CustomerRoutingGuardService, NavigationService],
    declarations: []
})
export class CustomerRoutingModule {
}