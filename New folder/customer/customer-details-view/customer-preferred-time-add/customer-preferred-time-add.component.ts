import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";

@Component({
  selector: 'app-customer-preferred-time-add',
  templateUrl: './customer-preferred-time-add.component.html',
  styleUrls: ['./customer-preferred-time-add.component.css']
})
export class CustomerPreferredTimeAddComponent implements OnInit {

  form: FormGroup;
  @Input() preferredTimes: any[];
  @Output() onSaveButtonClicked: EventEmitter<any> = new EventEmitter();
  @Output() onCancelButtonClicked: EventEmitter<any> = new EventEmitter();
  model: any;

  constructor(private customerService: CustomerService, private baseService: BaseService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      starttime: [],
      endtime: []
    });
    this.model = {};
  }

  ngOnInit() {
  }

  onClickPreferredTimeSaveButton() {
    // validate time
    if (this.model.startTime && this.model.endTime) {
      var splitedStartTime: number = Number(this.model.startTime.split(':')[0]);
      var splitedEndTime: number = Number(this.model.endTime.split(':')[0]);
      if (splitedStartTime < splitedEndTime) {
        // valid time
        this.onSaveButtonClicked.emit(this.model);
      } else {
        this.setFormControlError('starttime', 'StartTime can not be less than or equal to EndTime');
      }
    } else {
      if (!this.model.startTime) {
        this.setFormControlError('starttime', 'StartTime invalid');
      }
      if (!this.model.endTime) {
        this.setFormControlError('endtime', 'EndTime invalid');
      }
    }
  }



  onClickPreferredTimeCancelButton() {
    this.onCancelButtonClicked.emit("");
  }

  setFormControlError(controlName: string, message: string) {
    this.form.controls[controlName].setErrors({
      message: message
    });
  }

}
