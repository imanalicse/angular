import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-reactive-forms',
    templateUrl: './reactive-forms.component.html',
    styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

        this.userForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: [],
            address: this.formBuilder.group({
                street: [],
                city: [],
                postalCode: []
                //postalCode: [null, Validators.pattern('^[0-9][0-9]{4}$')]
            })
        });

        console.log(this.userForm.value)

    }

    ngOnInit() {

//required
        //console.log(this.userForm.controls['name'].hasError('required'))
    }

    onSubmit(){
        console.log(this.userForm.controls);
    }

}
