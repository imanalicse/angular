import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('Iman'),
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
