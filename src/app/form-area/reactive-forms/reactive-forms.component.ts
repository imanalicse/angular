import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  formGroup: FormGroup;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      postalCode: new FormControl()
    })
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

}
