import { Component, OnInit, ViewEncapsulation, trigger, transition, style, animate, state, Input } from '@angular/core';
import { CustomerService } from "../../services/customer.service";
import { BaseComponent } from "../../shared/base.component";
import { DialogTypeEnum } from "../../shared/enum-collection/dialog-type-enum";
import { BaseService } from "../../services/base.service";
import { CustomerBillingAddressModel } from "../../shared/models/customer-billing-address.model";
import { CustomerBillingAddressUpdateModel } from "app/shared/models/customer-billing-address-update.model";
import { StateModel } from "app/shared/models/state.model";

@Component({
    selector: 'app-customer-billing-address',
    templateUrl: './customer-billing-address.component.html',
    styleUrls: ['./customer-billing-address.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'viewPanelAnimation',
            [
                transition(
                    ':enter', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('200ms', style({ transform: 'translateX(0)' }))
                    ]
                ),
                transition(
                    ':leave', [
                        style({ transform: 'translateX(0)' }),
                        animate('200ms', style({ transform: 'translateX(-100%)' }))
                    ]
                )
            ]
        ),
        trigger(
            'updatePanelAnimation',
            [
                transition(
                    ':enter', [
                        style({ transform: 'translateX(100%)' }),
                        animate('200ms', style({ transform: 'translateX(0)' }))
                    ]
                ),
                transition(
                    ':leave', [
                        style({ transform: 'translateX(0)' }),
                        animate('200ms', style({ transform: 'translateX(100%)' }))
                    ]
                )
            ]
        )
    ]
})
export class CustomerBillingAddressComponent extends BaseComponent implements OnInit {

    viewModel: CustomerBillingAddressModel;
    states: StateModel[];
    enableViewPanel: boolean;
    enableUpdatePanel: boolean;
    isBillingAddressAvailable: boolean;

    constructor(private customerService: CustomerService, private baseService: BaseService) {
        super();
        this.viewModel = new CustomerBillingAddressModel();
        var response = this.baseService.getStates().subscribe(
            data => {
                if (data.data != undefined) {
                    this.states = data.data;
                }
            },
            error => { }
        );
    }

    ngOnInit() {

        // update button
        BaseService.subscribeOnce(this.customerService.onBillingAddressUpdateButtonClicked,
            data => { this.showAddressUpdatePanel(); },
            error => { console.log('error on update button click'); }
        );

        // save button
        BaseService.subscribeOnce(this.customerService.onBillingAddressSaveButtonClicked,
            data => { this.showAddressViewPanel(); },
            error => { console.log('error on save button click'); }
        );

        // cancel button
        BaseService.subscribeOnce(this.customerService.onBillingAddressCancelButtonClicked,
            data => { this.showAddressViewPanel(); },
            error => { console.log('error on cancel button click'); }
        );

        // billing address delete button
        BaseService.subscribeOnce(this.customerService.onBillingAddressDeleteButtonClicked,
            data => {
                this.baseService.openDialog(
                    DialogTypeEnum.Confirm,
                    "Are you sure you want to delete the address?",
                    "Delete Billing Address",
                    {
                        positive: () => {
                            this.customerService.deleteBillingAddress(this.viewModel.address.id).subscribe(
                                data => {
                                    if (data && data.status.code == 204) {
                                        // failed to delete
                                        this.baseService.openDialog(DialogTypeEnum.Error, "Could not detele.");
                                    } else {
                                        this.showAddressViewPanel();
                                    }
                                },
                                error => {
                                    console.log('error on delete billing address');
                                }
                            )
                        },
                        negative: () => {
                            //
                        }
                    }
                );
            },
            error => { console.log('error on delete button click'); }
        );

        // on address added
        BaseService.subscribeOnce(this.customerService.onBillingAddressAdded,
            data => {
                console.log("billing address added : ", data);
                if (data) {
                    this.showAddressViewPanel();
                }
            },
            error => { console.log('error on delete button click'); }
        )
    }

    showAddressViewPanel() {

        // get billing address
        this.customerService.getBillingAddress().subscribe(
            data => {
                this.requesting = false;
                if (data != undefined) {
                    if (data.status.code == 200) {
                        // address data
                        this.hasRequestError = false;
                        this.enablePanel(true, false);
                        this.viewModel = data.data;
                        if (!data.data) {
                            this.isBillingAddressAvailable = false;
                        } else {
                            this.isBillingAddressAvailable = true;
                            var address = data.data.address;
                            this.viewModel.address = address;
                            var _address = address.addressLine1;
                            _address += this.baseService.isEmpty(address.addressLine2) ? "" : ", " + address.addressLine2;
                            _address += this.baseService.isEmpty(address.city) ? "" : ", " + address.city;
                            _address += ", " + address.state.name;
                            _address += ", " + address.postCode;
                            this.viewModel.displayAddress = _address;

                            // profile data
                            var profile = this.customerService.getProfileModel();
                            this.viewModel.mobile = profile.mobile;
                            this.viewModel.emailAddress = profile.emailAddress;
                            this.viewModel.stateId = address.state.id;
                            console.log(this.viewModel);
                        }
                    }
                }
            },
            error => {
                this.enablePanel(false, false);
                this.requesting = false;
                this.hasRequestError = true;
                this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!");
            }
        )
    }

    showAddressUpdatePanel() {
        this.enablePanel(false, true);
    }

    selectChange($event: any) {
        if ($event.index == 1) {
            this.showAddressViewPanel();
        }
    }

    private enablePanel(viewPanel: boolean, updatePanel: boolean) {
        this.enableViewPanel = viewPanel;
        this.enableUpdatePanel = updatePanel;
    }

}
