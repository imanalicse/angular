import { Component } from '@angular/core';

@Component({
    selector: 'user',
    template: `
        <h1>Hello {{name}}</h1>
        <p><strong>{{email}}</strong></p>
        <p><strong>Address: </strong>{{address.street}} {{address.city}} {{address.state}}</p>
        <h3>Hobbies</h3>
        {{hobbies}}
        `,
})
export class UserComponent  {
    name : string;
    email: string;
    address: address;
    hobbies : string[];

    constructor(){

        console.log('Construction ran');

        this.name = 'John Doe';
        this.email = 'john@gmail.com';
        this.address = {
            street : '12 Main st',
            city:'Boston',
            state: 'N/A'
        }
        this.hobbies = ['Music', 'Movies', 'Sport'];
    }
}

interface address{
    street:string;
    city:string;
    state:string;
}