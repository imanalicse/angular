import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ParcelListModel} from "../../shared/models/parcel-list";
import {ParcelModel} from "../../shared/models/parcel";
import {ParcelFormModel} from "../../shared/models/parcel-form";
import {FormBuilder} from "@angular/forms";
import {NavModel} from "app/shared/models/nav-model";
import {NavigationService} from "app/services/navigation.service";
import {CustomerService} from "../../services/customer.service";
import {BaseComponent} from "../../shared/base.component";
import {BaseService} from "../../services/base.service";
import {DialogTypeEnum} from "app/shared/enum-collection/dialog-type-enum";
import "rxjs/add/operator/map";

@Component({
    selector: 'app-receive-parcels',
    templateUrl: './receive-parcels.component.html',
    styleUrls: ['./receive-parcels.component.scss'],
    providers: [ParcelFormModel],
    encapsulation: ViewEncapsulation.None
})
export class ReceiveParcelsComponent extends BaseComponent implements OnInit {

    parcelList: ParcelListModel;
    filterText = '';
    validationError: string;
    hoverParcel: any;

    constructor(private baseService: BaseService, private navigation: NavigationService, private customerService: CustomerService, private formBuilder: FormBuilder) {
        super();

        var nav: NavModel = new NavModel();
        nav.name = "receiveparcels";
        nav.title = "Received Parcels";
        this.navigation.navigate(nav);


        // filter
        BaseService.subscribeOnce(
            customerService.onParcelFilter,
            filterText => {
                this.filterText = filterText;
            }
        )
    }

    ngOnInit() {
        this.parcelList = new ParcelListModel();
        this.customerService.getReceivedParcelList()
            .subscribe(resp => {
                this.processParcelList(resp);
            },
            error => {
                this.requesting = false;
                this.hasRequestError = true;
                this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!");
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

    onHoverTr(hover: boolean, model) {
        this.hoverParcel = model;
    }
}
