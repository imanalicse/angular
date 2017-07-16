import { Component, OnInit } from '@angular/core';
import { NavigationService } from "app/services/navigation.service";
import { NavModel } from "app/shared/models/nav-model";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  public nav: NavModel;

  constructor(private navigation: NavigationService) {
    this.nav = new NavModel();
    this.navigation.navRetriver.subscribe((_nav) => {
        this.nav = _nav;
    })

   }

  ngOnInit() {

  }

}
