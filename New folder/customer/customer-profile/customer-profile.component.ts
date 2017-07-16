import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerProfileModel } from "app/shared/models/customer-profile.model";
import { CustomerService } from "app/services/customer.service";
import { MdTabChangeEvent } from "@angular2-material/tabs";
import { NavigationService } from "app/services/navigation.service";
import { NavModel } from "app/shared/models/nav-model";

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerProfileComponent implements OnInit {

  customerProfileModel: CustomerProfileModel;
  tabChangeEvent: MdTabChangeEvent

  constructor(private customerService: CustomerService, private navigation: NavigationService) { 
    var nav: NavModel = new NavModel();
    nav.name = "profile";
    nav.title = "Profile";
    this.navigation.navigate(nav);
  }

  ngOnInit() {
    
  }

  onTabChange($event: any) {
    this.tabChangeEvent = $event;
    console.log("profile")
    console.log(this.tabChangeEvent.index)
  }

  onNavChange($event: any) {
    console.log("onNavChange")
    console.log($event)
  }



}
