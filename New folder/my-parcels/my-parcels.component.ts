import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/map';
import { ParcelListModel } from "../../shared/models/parcel-list";
import { ParcelModel } from "../../shared/models/parcel";
import { ParcelFormModel } from "../../shared/models/parcel-form";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NavModel } from "app/shared/models/nav-model";
import { NavigationService } from "app/services/navigation.service";
import { CustomerService } from "../../services/customer.service";
import { BaseComponent } from "../../shared/base.component";
import { BaseService } from "../../services/base.service";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { MyParcelsAddDialogComponent } from "app/customer/my-parcels/my-parcels-add-dialog.component";
import { MyParcelsUpdateDialogComponent } from "app/customer/my-parcels/my-parcels-update-dialog/my-parcels-update-dialog.component";


@Component({
    selector: 'app-my-parcels',
    templateUrl: './my-parcels.component.html',
    styleUrls: ['./my-parcels.component.scss'],
    providers: [ParcelFormModel],
    encapsulation: ViewEncapsulation.None
})
export class MyParcelsComponent extends BaseComponent implements OnInit {

    parcelList: ParcelListModel;
    filterText = '';
    validationError: string;
    updatedParcel: any;
    hoverParcel: any;

    constructor(private baseService: BaseService, private navigation: NavigationService, private customerService: CustomerService, private formBuilder: FormBuilder, public dialog: MdDialog) {
        super();

        var nav: NavModel = new NavModel();
        nav.name = "myparcels";
        nav.title = "My Parcels";
        this.navigation.navigate(nav);

        // add
        BaseService.subscribeOnce(
            customerService.onParcelAddButtonClicked,
            data => {
                let dialogRef = this.dialog.open(MyParcelsAddDialogComponent, <MdDialogConfig>{
                    data: {},
                    disableClose: true
                });
            }
        )

        // filter
        BaseService.subscribeOnce(
            customerService.onParcelFilter,
            filterText => {
                this.filterText = filterText;
            }
        )

        // update
        BaseService.subscribeOnce(
            this.customerService.onParcelUpdateButtonClicked,
            data => {
                console.log("updated ", data);
                this.customerService.onParcelUpdated.next(data);
            },
            error => { console.log('error on update'); }
        );

        // updated
        BaseService.subscribeOnce(
            this.customerService.onParcelUpdated,
            data => {
                if (data) {
                    //
                }
            },
            error => { console.log('error on update'); }
        );

    }

    ngOnInit() {
        this.parcelList = new ParcelListModel();
        this.customerService.getParcelList()
            .subscribe(resp => {
                this.processParcelList(resp);
            },
            error => {
                this.requesting = false;
                this.hasRequestError = true;
                this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!");
            }
            );
        this.customerService.newParcelList.subscribe(
            resp => {
                this.processParcelList(resp);
            }
        );
    }

    processParcelList(resp: any) {
        this.parcelList.items = [];
        this.requesting = false;
        this.hasRequestError = false;
        if (resp != undefined) {
            if (resp.status.code == 200) {
                this.parcelList.hasNext = resp.hasNext;
                this.parcelList.statusCode = resp.status.code;
                for (let parcel of resp.data) {
                    var _parcel: ParcelModel = new ParcelModel();
                    _parcel.id = parcel.id;
                    _parcel.trackingNumber = parcel.trackingNumber;
                    _parcel.reliveriTrackingNumber = parcel.reliveriTrackingNumber;
                    _parcel.sender = parcel.sender;
                    _parcel.description = parcel.description;
                    _parcel.deliveryStatusId = parcel.delivery.deliveryStatus.id;
                    _parcel.deliveryStatusCode = parcel.delivery.deliveryStatus.code;
                    _parcel.deliveryStatusName = parcel.delivery.deliveryStatus.name;
                    this.parcelList.items.push(_parcel);
                }
            }
        }
    }

    onClickParcelUpdateButton(parcel: any) {
        this.updatedParcel = parcel;
        let dialogRef = this.dialog.open(MyParcelsUpdateDialogComponent, <MdDialogConfig>{
            data: {
                model: parcel
            },
            disableClose: true
        });
    }


    onClickParcelDeleteButton(parcel: any) {
        this.baseService.openDialog(
            DialogTypeEnum.Confirm,
            "Are you sure you want to delete the Parcel?",
            "Delete My Parcel",
            {
                positive: () => {
                    this.customerService.deleteParcel(parcel.id).subscribe(
                        data => {
                            if (data) {
                                if (data.status.code == 200) {
                                    var index = this.parcelList.items.indexOf(parcel, 0);
                                    console.log("index ", index);
                                    if (index > -1) {
                                        this.parcelList.items.splice(index, 1);
                                    }
                                    this.baseService.openDialog(
                                        DialogTypeEnum.Success,
                                        "Successfully deleted.",
                                        "Delete Parcel"
                                    );
                                } else {
                                    this.baseService.openDialog(
                                        DialogTypeEnum.Error,
                                        data.status.message
                                    );
                                }
                            }
                            console.log("parcel delete ", data);
                        },
                        error => {

                        }
                    );
                }
            }
        );

    }

    onHoverTr(hover: boolean, model) {
        this.hoverParcel = model;
    }
}
