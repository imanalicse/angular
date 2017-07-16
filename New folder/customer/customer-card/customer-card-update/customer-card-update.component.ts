import { Component, OnInit, Input } from '@angular/core';
import { CustomerCardUpdateModel } from "app/shared/models/customer-card-update.model";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CardTypeModel } from "app/shared/models/card-type.model";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { CustomerCardModel } from "app/shared/models/customer-card.model";

@Component({
  selector: 'app-customer-card-update',
  templateUrl: './customer-card-update.component.html',
  styleUrls: ['./customer-card-update.component.scss']
})
export class CustomerCardUpdateComponent implements OnInit {

  @Input() model: CustomerCardUpdateModel;
  form: FormGroup;
  @Input() cardTypes: CardTypeModel[];

  constructor(private customerService: CustomerService, private baseService: BaseService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      cardnumber: [],
      cardname: [],
      cardtypeid: [],
      expirydate: [],
    });

  }

  onClickSaveButton() {

    var updateModel: CustomerCardUpdateModel = new CustomerCardUpdateModel();

    updateModel = this.model;

    var response = this.customerService.updateCard(updateModel);
    response.subscribe(
      data => {
        var _data = data as any;
        if (_data.status.code) {
          console.log("success");
          this.customerService.onCardSaveButtonClicked.next('');
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
    this.customerService.onCardCancelButtonClicked.next('');
  }

}
