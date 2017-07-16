import {Component, OnInit, Input, Output} from '@angular/core';
import {MdTabChangeEvent} from "@angular2-material/tabs";
import {CustomerService} from "app/services/customer.service";
import {CustomerProfileModel} from "app/shared/models/customer-profile.model";
import {BaseService} from "app/services/base.service";
import {BaseComponent} from "app/shared/base.component";
import {DialogTypeEnum} from "app/shared/enum-collection/dialog-type-enum";
import {StateModel} from "../../shared/models/state.model";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent extends BaseComponent implements OnInit {

    customer:CustomerProfileModel;
    enableViewPanel: boolean;
    enableUpdatePanel: boolean;
    states: StateModel[];
    lat: number;
    lng: number;

    constructor(private customerService:CustomerService, private baseService:BaseService) {
        super();
        this.customer = new CustomerProfileModel();

        this.baseService.getStates().subscribe(
            data => {
                if (data.data != undefined) {
                    this.states = data.data;
                }
            },
            error => {
                //
            }
        );
    }

    ngOnInit() {

        this.showProfileViewPanel();

        this.customerService.onProfileCancelButtonClicked.subscribe(data=>{
            this.showProfileViewPanel();
        })

        this.customerService.onProfileUpdateButtonClicked.subscribe(data =>{
            this.showProfileUpdatePanel();
        })

        this.customerService.onProfileSaveButtonClicked.subscribe(data =>{
            this.showProfileViewPanel();
        })
    }

    showProfileViewPanel() {

        this.customerService.profile().subscribe(
            data => {
              // console.log(data);
                if (data != undefined) {
                    if (data.status.code == 200) {
                        this.requesting = false;
                        this.hasRequestError = false;
                        this.enablePanel(true, false);
                        this.customer = data.data;
                        this.customer.photoPath = this.customer.photoPath?environment.webapiuri+"/"+this.customer.photoPath:"../assets/images/default-large.png";

                        // fire onProfileLoad
                        this.customerService.onProfileLoad.next(data.data);

                        for (let address of data.data.userAddresses) {
                            // primary address = 1, billing address = 2, shipping address = 3
                            if (address.addressType.id == 1) {
                                var _address = address.address.addressLine1;
                                _address += address.address.addressLine2 == null ? "" : ", " + address.address.addressLine2;
                                _address += address.address.city == null ? "" : ", " + address.address.city;
                                _address += ", " + address.address.state.name;
                                _address += ", " + address.address.postCode;
                                this.customer.displayAddress = _address;
                                this.customer.address = address.address;
                                this.customer.stateId = address.address.state.id;
                                this.lat = parseFloat(this.customer.address.latitude);
                                this.lng = parseFloat(this.customer.address.longitude);
                            }
                        }
                        console.log(this.customer.address.latitude);
                        console.log(this.lng+ " lng");

                    }
                }
            },
            error => {
                this.requesting = false;
                this.hasRequestError = true;
                this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!");
            }
        )

    }

    showProfileUpdatePanel(){
        this.enablePanel(false, true);
    }

    selectChange($event:any) {
        if ($event.index == 0) {
            this.showProfileViewPanel();
        }
    }

    private enablePanel(viewPanel: boolean, updatePanel: boolean) {
        this.enableViewPanel = viewPanel;
        this.enableUpdatePanel = updatePanel;
    }
}
