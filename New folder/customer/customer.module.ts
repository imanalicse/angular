import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CoreModule } from '../core/core.module';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerBillingAddressComponent } from './customer-billing-address/customer-billing-address.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardLayoutModule } from "app/dashboard-layout.module";
import { CustomerMyParcelsHeaderComponent } from './customer-myparcels-header/customer-myparcels-header.component';
import { CustomerNavComponent } from './customer-nav/customer-nav.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerNearestAgentComponent } from './customer-nearest-agent/customer-nearest-agent.component';
import { CommonDialog } from "app/shared/common-dialog/common-dialog.component";
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager } from '@agm/core';
import { CoreMap } from "app/customer/customer-nearest-agent/map.component";
import { CustomerService } from "app/services/customer.service";
import { CustomerDetailsViewComponent } from "./customer-details-view/customer-details-view.component";
import { CustomerDetailsUpdateComponent } from "./customer-details-update/customer-details-update.component";
import { CustomerBillingAddressAddComponent } from './customer-billing-address/customer-billing-address-add/customer-billing-address-add.component';
import { CustomerBillingAddressViewComponent } from "app/customer/customer-billing-address/customer-billing-address-view/customer-billing-address-view.component";
import { CustomerBillingAddressUpdateComponent } from "app/customer/customer-billing-address/customer-billing-address-update/customer-billing-address-update.component";
import { CustomerCardViewComponent } from "app/customer/customer-card/customer-card-view/customer-card-view.component";
import { CustomerCardUpdateComponent } from "app/customer/customer-card/customer-card-update/customer-card-update.component";
import { CustomerCardAddComponent } from './customer-card/customer-card-add/customer-card-add.component';
import { MyParcelsComponent } from "app/customer/my-parcels/my-parcels.component";
import { MyParcelsAddDialogComponent } from "app/customer/my-parcels/my-parcels-add-dialog.component";
import { MyParcelsFilterPipe } from "app/customer/my-parcels/my-parcels-filter.pipe";
import { MyParcelsUpdateDialogComponent } from "app/customer/my-parcels/my-parcels-update-dialog/my-parcels-update-dialog.component";
import { CustomerPreferredTimeUpdateComponent } from "app/customer/customer-details-view/customer-preferred-time-update/customer-preferred-time-update.component";
import { CustomerPreferredTimeAddComponent } from './customer-details-view/customer-preferred-time-add/customer-preferred-time-add.component';
import {ReceiveParcelsComponent} from "./receive-parcels/receive-parcels.component";
import {CustomerReceiveParcelsHeaderComponent} from "./customer-receiveparcels-header/customer-receiveparcels-header.component";

@NgModule({
    imports: [
        CommonModule,
        CustomerRoutingModule,
        CoreModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        DashboardLayoutModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD335lsOrDZwrHCQoW5J8-GHi5NjSqsvFY'
        })
    ],
    declarations: [
        CustomerComponent,
        CustomerLoginComponent,
        CustomerProfileComponent,
        CustomerCardComponent,
        MyParcelsComponent,
        MyParcelsAddDialogComponent,
        MyParcelsFilterPipe,
        CustomerBillingAddressComponent,
        CustomerMyParcelsHeaderComponent,
        CustomerNavComponent,
        CustomerDetailsComponent,
        CustomerDetailsViewComponent,
        CustomerDetailsUpdateComponent,
        CustomerDashboardComponent,
        CustomerNearestAgentComponent,
        CommonDialog,
        CoreMap,
        CustomerBillingAddressUpdateComponent,
        CustomerBillingAddressViewComponent,
        CustomerCardViewComponent,
        CustomerCardUpdateComponent,
        CustomerBillingAddressAddComponent,
        CustomerCardAddComponent,
        MyParcelsUpdateDialogComponent,
        CustomerPreferredTimeUpdateComponent,
        CustomerPreferredTimeAddComponent,
        ReceiveParcelsComponent,
        CustomerReceiveParcelsHeaderComponent
    ],
    entryComponents: [
        MyParcelsAddDialogComponent,
        MyParcelsUpdateDialogComponent,
        CommonDialog
    ],
    providers: [
        GoogleMapsAPIWrapper,
        MarkerManager,
        InfoWindowManager,
        CustomerService
    ]
})
export class CustomerModule {
}
