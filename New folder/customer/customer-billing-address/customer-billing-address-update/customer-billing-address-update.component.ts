import { Component, OnInit, Input } from '@angular/core';
import { CustomerBillingAddressUpdateModel } from "app/shared/models/customer-billing-address-update.model";
import { CustomerService } from "app/services/customer.service";
import { BaseComponent } from "app/shared/base.component";
import { BaseService } from "app/services/base.service";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomerBillingAddressModel } from "app/shared/models/customer-billing-address.model";

@Component({
  selector: 'app-customer-billing-address-update',
  templateUrl: './customer-billing-address-update.component.html',
  styleUrls: ['./customer-billing-address-update.component.scss']
})
export class CustomerBillingAddressUpdateComponent implements OnInit {

  @Input() model: CustomerBillingAddressModel;
  @Input() states: any;
  form: FormGroup;
  @Input() selectedStateId: number;

  constructor(private customerService: CustomerService, private baseService: BaseService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      addressline1: [],
      addressline2: [],
      stateid: [],
      mobile: [],
      postcode: [],
      city: [],
    });

  }

  onClickSaveButton() {

    var updateModel: CustomerBillingAddressUpdateModel = new CustomerBillingAddressUpdateModel();

    updateModel.addressId = this.model.address.id;
    updateModel.addressLine1 = this.model.address.addressLine1;
    updateModel.addressLine2 = this.model.address.addressLine2;
    updateModel.city = this.model.address.city;
    updateModel.postCode = this.model.address.postCode;
    updateModel.stateId = this.model.stateId;
    updateModel.mobile = this.model.mobile;

    this.customerService.updateBillingAddress(updateModel).subscribe(
      data => {
        var _data = data as any;
        if (_data.status.code) {
          console.log("success");
          this.customerService.onBillingAddressSaveButtonClicked.next('');
          this.customerService.updateProfileModel(updateModel);
        }
      },
      error => {
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

  onClickCancelButton() {
    this.customerService.onBillingAddressCancelButtonClicked.next('');
  }

  onChangeState(event: any) {
    this.selectedStateId = event.value;
    this.model.address.state.id = this.selectedStateId
  }

}
