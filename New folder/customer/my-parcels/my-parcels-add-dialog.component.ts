import {Component, OnInit, Inject} from "@angular/core";
import {MD_DIALOG_DATA} from "@angular/material";
import {Router} from "@angular/router";
import {ParcelFormModel} from "../../shared/models/parcel-form";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import "rxjs/add/operator/map";

@Component({
    selector: 'my-parcels-add-dialog.component',
    templateUrl: 'my-parcels-add-dialog.component.html',
    providers: [ParcelFormModel],
})
export class MyParcelsAddDialogComponent implements OnInit {

    parcelFormModel:ParcelFormModel;
    form:FormGroup;
    hasValidationError:boolean;
    validationError:string;
    successMessage:string;

    constructor(private router:Router, private customerService:CustomerService, private formBuilder:FormBuilder, @Inject(MD_DIALOG_DATA)
    public parcel:any) {
        this.parcelFormModel = new ParcelFormModel();

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            trackingnumber: [],
            sender: [],
            description: [],
        });
    }

    setControlErrors(controlName:string, message:string) {
        if (this.form.controls[controlName]) {
            var control = this.form.controls[controlName];
            control.markAsTouched(true);
            control.setErrors({
                message: message
            });
        }
    }

    public onParcelSave() {

        this.parcelFormModel.parcelTypeId = 1;

        if (this.parcelFormModel.trackingNumber == '' || this.parcelFormModel.trackingNumber == null) {
            this.setControlErrors("trackingnumber", "If you do not have a Tracking Number, please enter NA.");
        }

        if (this.parcelFormModel.sender == '' || this.parcelFormModel.sender == null) {
            this.setControlErrors("sender", "Sender is required.");
        }

        if (this.parcelFormModel.description == '' || this.parcelFormModel.description == null) {
            this.setControlErrors("description", "Description is required.");
        }

        if (this.form.status == 'INVALID') {
            return false;
        }

        this.customerService.addParcel(this.parcelFormModel).subscribe(
            data => {
                if (data != undefined) {
                    if (data.status.code == 204) {
                        console.log(data.status.message);
                        this.hasValidationError = true;
                        this.validationError = data.status.message;
                        return;
                    }
                }

                this.successMessage = 'Parcel has been added successfully';
                this.form.reset();
                setTimeout(function () {
                    document.getElementById('btn-close').click();
                }, 1000);
            },
            errorData => {
                let data = errorData.json();
                if (data != undefined) {
                    if (data.status.code == 200) {
                        this.hasValidationError = false;
                        this.validationError = '';
                    } else if (data.status.code == 422) {
                        this.hasValidationError = true;
                        for (let error of data.data) {
                            var fieldName:string = error.source.toLowerCase();
                            this.form.controls[fieldName].setErrors({
                                message: error.message
                            });
                        }
                    } else if (data.status.code == 204) {
                        // validation error
                        this.hasValidationError = true;
                        this.validationError = data.status.message;
                    }
                }
            }
        );
    }

}
