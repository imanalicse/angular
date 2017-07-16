import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CustomerService} from "../../services/customer.service";

@Component({
    selector: 'app-customer-receiveparcels-header',
    templateUrl: './customer-receiveparcels-header.component.html',
    styleUrls: ['./customer-receiveparcels-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerReceiveParcelsHeaderComponent implements OnInit {

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
    }

    addParcel() {
        this.customerService.clickAdd();
    }

    parcelFilter(event){
        if(event.keyCode == 13 || event.target.value=='') {
            this.customerService.parcelFilter(event.target.value);
        }
    }

}
