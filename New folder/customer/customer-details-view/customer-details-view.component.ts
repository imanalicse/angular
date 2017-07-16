import {Component, OnInit, Input, Output, ViewEncapsulation, ViewChild} from '@angular/core';
import { CustomerService } from "app/services/customer.service";
import { CustomerProfileModel } from "app/shared/models/customer-profile.model";
import { BaseService } from "app/services/base.service";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { CustomerPreferredTimeModel } from "app/shared/models/customer-preferred-time.model";
import {Headers} from "@angular/http";
import {environment} from "../../../environments/environment";
import {CustomerPreferredTimeAddComponent} from "./customer-preferred-time-add/customer-preferred-time-add.component";

@Component({
  selector: 'app-customer-details-view',
  templateUrl: './customer-details-view.component.html',
  styleUrls: ['./customer-details-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerDetailsViewComponent implements OnInit {

  @Input() customer: CustomerProfileModel;
  @Input() hasRequestError;
  latitude: string;
  longitude: string;
  mapRouterLink: string;
  preferredTimes: any[];
  selectedPreferredTimeForUpdate: any;
  selectedPreferredTimeId: number;
  enableAddForm: boolean;

  public file: File;
  public url: string;
  headers: Headers;
  //
  // @ViewChild ()
  // addForm: CustomerPreferredTimeAddComponent;

  @ViewChild("addForm") addForm;
  @ViewChild("editForm") editForm;

  constructor(private customerService: CustomerService, private baseService: BaseService) {

    this.preferredTimes = [];
    for (var i = 0; i < 24; i++) {
      var hour: string = i <= 9 ? "0" + i : String(i);
      var time: any = {
        startTime: hour + ":00:00",
        endTime: hour + ":00:00"
      }
      this.preferredTimes.push(time);
    }

  }

  ngOnInit() {
    console.log(this.customer);
    this.customer.lastName = this.customer.lastName ? this.customer.lastName : "";
    if (!this.customer.address) {
      this.latitude = "0";
      this.longitude = "0";
    }
    else {
      this.latitude = this.customer.address.latitude;
      this.longitude = this.customer.address.longitude;
    }
    this.mapRouterLink = "/useraddress-map/" + this.latitude + "/" + this.longitude;
  }

  onClickUpdateButton() {
    this.customerService.onProfileUpdateButtonClicked.next('');
  }

  onClickPreferredTimeDeleteButton(model: any) {
    this.baseService.openDialog(
      DialogTypeEnum.Confirm,
      "Are you sure you want to delete the selected Preferred Time?",
      "Delete Preferred Time",
      {
        positive: () => {
          this.customerService.deletePreferredTime(model.id).subscribe(
            data => {
              console.log("deleted preferred time ", data);
              if (data && data.data) {
                this.customer.preferredTimes = data.data
              }
            },
            error => { console.log(" error on delete customer preferred time") }
            );
        },
        negative: () => {
          console.log("preferred time delete cancel");
        }
      }
      );
  }

  onClickPreferredTimeAddFormSaveButton(model: any) {
    model.customerId = this.customer.id;
    this.customerService.addPreferredTime(model).subscribe(
      data => {
        if (data && data.data) {
          this.customer.preferredTimes = data.data;
          this.enableAddForm = false;
        }
      },
      error => {
        var err = error.json();
        this.enableAddForm = true;
        this.addForm.setFormControlError('starttime', err.data[0].message);
      }
      );
  }

  onClickPreferredTimeUpdateButton(model: any) {
    this.selectedPreferredTimeId = model.id;
    this.selectedPreferredTimeForUpdate = model;
  }

  onClickPreferredTimeUpdateFormSaveButton(model: any) {
    this.customerService.updatePreferredTime(model).subscribe(
      data => {
        if (data && data.status.code == 200) {
          this.selectedPreferredTimeId = 0;
          this.selectedPreferredTimeForUpdate.startTime = data.data.startTime;
          this.selectedPreferredTimeForUpdate.endTime = data.data.endTime;
        } else {
          this.selectedPreferredTimeId = 0;
        }
      },
      error => {
        var err = error.json();
        this.editForm.setFormControlError('starttime', err.data[0].message);
      }
      );
  }

  onClickPreferredTimeUpdateFormCancelButton(event?: any) {
    this.selectedPreferredTimeId = 0;
  }

  onClickPreferredTimeAddButton() {
    this.enableAddForm = true;
  }

  onClickPreferredTimeAddFormCancelButton() {
    this.enableAddForm = false;
  }
  changeListener($event): void {

    console.log('file upload Initialized');
    //set the header as multipart
    this.headers = new Headers();
    this.headers.set('Content-Type', 'multipart/form-data');
    this.url = 'customer/profile/photo';
    this.postFile($event.target);
  }

  postFile(inputValue: any): void {

    var formData = new FormData();
    formData.append("name", "Name");
    formData.append("file",  inputValue.files[0])
    console.log(formData);
    console.log(inputValue.files[0]);

    this.customerService.updateProfilePhoto(formData);
  }

}
