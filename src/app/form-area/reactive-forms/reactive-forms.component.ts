import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import * as moment from 'moment/moment';
import { UserFormModel, UserFormDataModel } from 'app/shared/user-form-model';

@Component({
    selector: 'app-reactive-forms',
    templateUrl: './reactive-forms.component.html',
    styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

    userForm: FormGroup;
    //model: UserFormModel;
    model: UserFormDataModel;
    maxDate: any;

    today: string = moment().format('D MMM YYYY');



    constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {

        this.dateAdapter.setLocale('fr');

        this.model = new UserFormDataModel();
        console.log('this.model ', this.model);
        //this.model.address.city

        this.userForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: [],
            address: this.formBuilder.group({
                city: [],
                street: [],
                postalCode: [null, Validators.pattern('^[0-9][0-9]{4}$')]
            })
        });

        //console.log(this.userForm.value);
        console.log('this.today ', this.today)

    }

    ngOnInit() {

        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() - 1);

//required
        //console.log(this.userForm.controls['name'].hasError('required'))
    }

    onSubmit(){
        console.log(this.userForm.controls);
        console.log(this.model);
    }

}
