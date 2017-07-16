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

    constructor(private fb:FormBuilder) {
        this.createForm();
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
    }

    onSubmit() {
        console.log('Controls ', this.heroForm.controls);

        console.log('Form Value ', this.heroForm.value)
        console.log('Status ', this.heroForm.status)
    }
}
