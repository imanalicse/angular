import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CustomerService} from "../../services/customer.service";

@Component({
    selector: 'app-customer-myparcels-header',
    templateUrl: './customer-myparcels-header.component.html',
    styleUrls: ['./customer-myparcels-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerMyParcelsHeaderComponent implements OnInit {

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
