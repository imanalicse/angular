import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";
import { CustomerCardAddModel } from "app/shared/models/customer-card-add.model";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { CardTypeModel } from "app/shared/models/card-type.model";

@Component({
  selector: 'app-customer-card-add',
  templateUrl: './customer-card-add.component.html',
  styleUrls: ['./customer-card-add.component.css']
})
export class CustomerCardAddComponent implements OnInit {

  model: CustomerCardAddModel;
  form: FormGroup;
  @Input() cardTypes: CardTypeModel[];

  constructor(private customerService: CustomerService, private baseService: BaseService, private formBuilder: FormBuilder) {
    this.model = new CustomerCardAddModel();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cardnumber: [],
      cardname: [],
      cardtypeid: [],
      expirydate: [],
    });
  }

  onCancelButtonClick() {
    this.customerService.onCardAddCancelButtonClicked.next('');
  }

  onSaveButtonClick() {
    
    var profile = this.customerService.getProfileModel();
    this.model.customerId = profile.id;
    
    this.customerService.addCard(this.model).subscribe(
      data => {
        var _data = data as any;
        if (_data.status.code) {
          //this.area = "button";
          this.customerService.onCardAdded.next(true);
        }
      },
      error => {
        this.customerService.onCardAdded.next(false);
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

}
