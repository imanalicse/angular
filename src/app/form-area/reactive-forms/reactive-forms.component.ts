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
    name: new FormControl('Iman', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    email: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      postalCode: new FormControl(null, Validators.pattern('^[0-9][0-9]{4}$'))
    })
  });



  constructor() { }

  ngOnInit() {
    //console.log(this.userForm.controls['name'].hasError('required'))
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

}
