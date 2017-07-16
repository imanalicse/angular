import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";
import { CustomerBillingAddressAddModel } from "app/shared/models/customer-billing-address-add.model";
import { StateModel } from "app/shared/models/state.model";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";

@Component({
  selector: 'customer-billing-address-add',
  templateUrl: './customer-billing-address-add.component.html',
  styleUrls: ['./customer-billing-address-add.component.css']
})
export class CustomerBillingAddressAddComponent implements OnInit {

  address: CustomerBillingAddressAddModel;
  form: FormGroup;
  @Input() states: StateModel[];
  area: string;

  constructor(private customerService: CustomerService, private baseService: BaseService, private formBuilder: FormBuilder) {
    this.area = 'button';
    this.address = new CustomerBillingAddressAddModel();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      addressline1: [],
      addressline2: [],
      stateid: [],
      postcode: [],
      city: [],
    });
  }

  onAddButtonClick() {
    this.area = "form";
  }

  onSaveButtonClick() {
    this.customerService.addBillingAddress(this.address).subscribe(
      data => {
        var _data = data as any;
        if (_data.status.code) {
          this.area = "button";
          console.log("address added ", _data);
          this.customerService.onBillingAddressAdded.next(true);
        }
      },
      error => {
        this.customerService.onBillingAddressAdded.next(false);
        var data = error.json();
        if (data.data != undefined) {
          for (let err of data.data) {
            var fieldName: string = err.source.toLowerCase();
            this.form.controls[fieldName].setErrors({
              message: err.message
            });
          }
        } else {
          this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!")
        }
      }
    )

  }

  onCancelButtonClick() {
    this.area = "button";
  }

}
