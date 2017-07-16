import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { NavigationService } from "app/services/navigation.service";
import { NavModel } from "app/shared/models/nav-model";
import { AccountService } from "app/services/account.service";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-customer-nav',
    templateUrl: './customer-nav.component.html',
    styleUrls: ['./customer-nav.component.scss'],
    providers: [AccountService]
})
export class CustomerNavComponent implements OnInit {

    activeNav: string;
    name: string;
    imageUrl:string;

    @Output()
    selectedNav: EventEmitter<string> = new EventEmitter();

    constructor(private customerService: CustomerService, private router: Router, private navigation: NavigationService, private accountService: AccountService) {

        this.navigation.navRetriver.subscribe((_nav) => {
            this.activeNav = _nav.name;
        });

        BaseService.subscribeOnce(
            this.customerService.onProfileLoad,
            data => {
                this.imageUrl = data.photoPath;
                this.name = data.firstName;
                this.name += data.lastName ? " " + data.lastName : "";
            }
        );

    }

    ngOnInit() {

    }

    selectNav(name: string) {

        this.activeNav = name;
        this.selectedNav.emit(name);

        switch (name) {
            case 'myparcels':
                this.router.navigate(['customer/my-parcels']);
                break;
            case 'receiveparcels':
                this.router.navigate(['customer/receive-parcels']);
                break;
            case 'profile':
                this.router.navigate(['customer/profile']);
                break;
            case 'logout':
                break;
        }

    }

    onClickProfilePhotoEditButton() {
        var file = document.getElementById('profile-photo');
        if(file){
            file.click();
        }
    }


  @ViewChild("fileInput") fileInput;
  uploadProfilePhoto(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      var res = this.customerService
        .upload(fileToUpload)
        .map(res => res.json());
        res.subscribe(
        data => {
          this.imageUrl = environment.webapiuri + "/" + data.data;
          var profile = this.customerService.getProfileModel();
          profile.photoPath = this.imageUrl;
        },
        error => {

        }
      );
    }
  }

    logout() {
        this.accountService.logout();
        this.router.navigate(['/customer/login']);
    }
}
