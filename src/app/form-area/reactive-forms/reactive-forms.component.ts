import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { states } from 'app/shared/data-model';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit{

  heroForm: FormGroup;
  //states = states;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(){

    console.log(this.heroForm.value)
  }

  createForm() {

    //console.log(this.states);

    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      street: '',
      city: '',
      state: '',
      zip: '',
      power: '',
      sidekick: ''
    });
  }

  onSubmit() {
    
    console.log('Form Value ', this.heroForm.value)
    console.log('Status ', this.heroForm.status)
  }
}
