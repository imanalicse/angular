import {Component, OnInit, Inject} from "@angular/core";
import {ParcelFormModel} from "app/shared/models/parcel-form";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "app/services/customer.service";
import {Router} from "@angular/router";
import {MD_DIALOG_DATA} from "@angular/material";
import {ParcelUpdateModel} from "app/shared/models/parcel-update-model";
import {BaseService} from "app/services/base.service";
import {DialogTypeEnum} from "app/shared/enum-collection/dialog-type-enum";

@Component({
    selector: 'app-my-parcels-update-dialog',
    templateUrl: './my-parcels-update-dialog.component.html',
    providers: [ParcelFormModel]
})
export class MyParcelsUpdateDialogComponent implements OnInit {

    form: FormGroup;
    hasValidationError: boolean;
    validationError: string;
    successMessage: string;
    model: ParcelUpdateModel;

    constructor(private baseService: BaseService, private router: Router, private customerService: CustomerService, private formBuilder: FormBuilder, @Inject(MD_DIALOG_DATA)
    public parcel: any) {

        this.model = new ParcelUpdateModel();

        this.form = this.formBuilder.group({
            trackingnumber: [],
            sender: [],
            description: [],
        });

        this.map(parcel.model, this.model);

    }

    ngOnInit() {
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

    onClickSaveButton() {

        if (this.model.trackingNumber == '' || this.model.trackingNumber == null) {
            this.setControlErrors("trackingnumber", "If you do not have a Tracking Number, please enter NA.");
        }

        if (this.model.sender == '' || this.model.sender == null) {
            this.setControlErrors("sender", "Sender is required.");
        }

        if (this.model.description == '' || this.model.description == null) {
            this.setControlErrors("description", "Description is required.");
        }

        if (this.form.status == 'INVALID') {
            return false;
        }

        this.customerService.updateParcel(this.model).subscribe(
            data => {
                console.log("parcel update ", data);
                if (data) {
                    if (data.status.code == 200) {
                        // update success
                        //this.customerService.onParcelUpdated.next(this.model);

                        this.successMessage = 'Parcel has been updated successfully';

                        setTimeout(function () {
                            document.getElementById('btn-close').click();
                            // this.form.reset();
                        }, 100);
                        //this.map(this.model, this.parcel.model);
                    } else {
                        this.customerService.onParcelUpdated.next(false);
                        this.baseService.openDialog(
                            DialogTypeEnum.Error,
                            data.status.message
                        );
                    }
                }
            },
            error => {
                console.log("parcel update error ", error);
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
        );
    }

    private map(source: any, destination: any) {
        destination.id = source.id;
        destination.sender = source.sender;
        destination.description = source.description;
        destination.trackingNumber = source.trackingNumber ? source.trackingNumber: 'NA';
        destination.reliveriTrackingNumber = source.reliveriTrackingNumber;
    }

}
