import { Component, OnInit } from '@angular/core';
import { LoginModel } from "../../shared/models/login.model";
import { AccountService } from "../../services/account.service";
import { CustomerService } from "../../services/customer.service";
import { CustomerRoutingGuardService } from "app/customer/customer-routing-guard.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BaseService } from "app/services/base.service";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
  providers: [AccountService]
})
export class CustomerLoginComponent implements OnInit {

  hasValidationError: boolean;
  loginModel: LoginModel;
  validationError: string;
  form: FormGroup;

  constructor(private baseService: BaseService, private customerService: CustomerService, private accountService: AccountService, private routerService: Router, private customerRoutingGuardService: CustomerRoutingGuardService, private formBuilder: FormBuilder) {
    this.loginModel = new LoginModel();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [],
      password: []
    });

  }

  public onLogin() {
    this.accountService.login(this.loginModel, (data => {
      if (data && data.status) {
        if (data.status.code == 200) {
          // login success
          if (this.customerRoutingGuardService.canActivate()) {
            this.routerService.navigate(['/customer/profile']);
            this.hasValidationError = false;
          } else {
            this.hasValidationError = true;
            this.validationError = 'Invalid or unauthorized customer.';
          }
        } else if (data.status.code == 422) {
          // validation error
          // this.hasValidationError = true;
          for(let error of data.data) {
            var fieldName: string = error.source.toLowerCase();
            this.form.controls[fieldName].setErrors({
              message: error.message
            });
          }
        } else if (data.status.code == 204) {
          // validation error
          this.hasValidationError = true;
          this.validationError = data.status.message;
        }
      } else if(data.type && data.type == 'error'){
        // connection refused
        this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!");
      }
    }))
  }

}
