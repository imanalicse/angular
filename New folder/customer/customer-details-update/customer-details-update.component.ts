import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { CustomerService } from "app/services/customer.service";
import { CustomerProfileModel } from "app/shared/models/customer-profile.model";
import { BaseService } from "app/services/base.service";
import {CustomerProfileAddressUpdateModel} from "../../shared/models/customer-profile-addpress-update.model";
import {DialogTypeEnum} from "../../shared/enum-collection/dialog-type-enum";

@Component({
  selector: 'app-customer-details-update',
  templateUrl: './customer-details-update.component.html',
  styleUrls: ['./customer-details-update.component.scss']
})
export class CustomerDetailsUpdateComponent implements OnInit {

  @Input() customer: CustomerProfileModel;
  @Input() states: any;
  form: FormGroup;

  constructor(private customerService: CustomerService, private baseService: BaseService, private formBuilder: FormBuilder) {
    //this.customer = new CustomerProfileModel();
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [],
      addressline1: [],
      addressline2: [],
      stateid: [],
      mobile: [],
      postcode: [],
      city: [],
    });
    
    console.log(this.customer)
  }

  onClickSaveButton(){

    var updateModel: CustomerProfileAddressUpdateModel = new CustomerProfileAddressUpdateModel();

    updateModel.firstName = this.customer.firstName;
    updateModel.lastName = this.customer.lastName;
    updateModel.addressId = this.customer.address.id;
    updateModel.addressLine1 = this.customer.address.addressLine1;
    updateModel.addressLine2 = this.customer.address.addressLine2;
    updateModel.city = this.customer.address.city;
    updateModel.postCode = this.customer.address.postCode;
    updateModel.stateId = this.customer.stateId;
    updateModel.mobile = this.customer.mobile;

    console.log('updateModel ', updateModel);

    var response = this.customerService.updateProfileAddress(updateModel);
    response.subscribe(
        data => {
          var _data = data as any;
          if (_data.status.code) {
            console.log("success");
            this.customerService.onProfileSaveButtonClicked.next('');
          }
        },
        error => {
          var data = error.json();
          //console.log(data)
          if (data.data != undefined) {
            for (let err of data.data) {

              var fieldName: string = err.source.toLowerCase();
              if(err.source=='FirstName'){ fieldName = 'firstName';}
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

  onClickCancelButton(){
    this.customerService.onProfileCancelButtonClicked.next('');
  }
}
