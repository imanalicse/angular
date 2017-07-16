import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Address, Hero, states } from 'app/shared/data-model';

@Component({
    selector: 'app-reactive-forms',
    templateUrl: './reactive-forms.component.html',
    styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

    heroForm:FormGroup;
    states = states;
    hero: Hero;

    constructor(private fb:FormBuilder) {
        this.createForm();
        //this.hero = new Hero();
    }

    ngOnInit() {
        
        console.log(this.heroForm.value)
        
    }

    createForm() {

        //console.log(this.states);

        this.heroForm = this.fb.group({
            name: ['', Validators.required],
            address: this.fb.group(new Address()),
            power: '',
            sidekick: ''
        });

        this.heroForm.setValue({
            name:    this.hero.name,
            address: this.hero.addresses[0] || new Address()
        });
    }

    onSubmit() {
        
        console.log('Controls ', this.heroForm.controls);

        console.log('Form Value ', this.heroForm.value)
        console.log('Status ', this.heroForm.status)
    }
}
