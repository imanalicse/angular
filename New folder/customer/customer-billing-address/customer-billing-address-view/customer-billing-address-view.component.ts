import { Component, OnInit, Input } from '@angular/core';
import { CustomerBillingAddressModel } from "app/shared/models/customer-billing-address.model";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";

@Component({
  selector: 'app-customer-billing-address-view',
  templateUrl: './customer-billing-address-view.component.html',
  styleUrls: ['./customer-billing-address-view.component.scss']
})
export class CustomerBillingAddressViewComponent implements OnInit {

  mapRouterLink: string;

  @Input() model: CustomerBillingAddressModel;

  constructor(private customerService: CustomerService, private baseService: BaseService) { }

  ngOnInit() {
      console.log(this.model.address.latitude);
      console.log(this.model.address.longitude);
      this.mapRouterLink = "/useraddress-map/" + this.model.address.latitude + "/" + this.model.address.longitude;
      console.log("this.mapRouterLink ", this.mapRouterLink)
  }

  onClickSaveButton() {
    this.customerService.onBillingAddressUpdateButtonClicked.next('');
  }

  onClickDeleteButton() {
    this.customerService.onBillingAddressDeleteButtonClicked.next('');
  }

}
