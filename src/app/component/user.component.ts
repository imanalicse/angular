import { Component } from '@angular/core';
import {PostsService } from '../services/posts.service';

@Component({
    selector: 'user',
    template: `
        <h1>Hello {{name}}</h1>
        <p><strong>{{email}}</strong></p>
        <p><strong>Address: </strong>{{address.street}} {{address.city}} {{address.state}}</p>
         
        <button (click)="toggleHobbies()">{{showHobbies ? "Hide Hobbies" : "Show Hobbies"}}</button>
          
        <div *ngIf="showHobbies">
            <h3>Hobbies</h3> 
            <ul>
                <li *ngFor="let hobby of hobbies; let i=index">
                    {{hobby}} <button (click)="deleteHobby(i)">X</button>
                </li>
            </ul>
            <form (submit)="addHobby(hobby.value)">
                <label>Add Hobbies</label><br>
                <input type="text" #hobby>
            </form>
        </div>
        <h3>Edit User</h3>
        <form>
            <label>Name:</label><br>
            <input type="text" name="name" [(ngModel)]="name"><br>
            <label>Email:</label><br>
            <input type="text" name="email" [(ngModel)]="email"><br>
            <label>Street:</label><br>
            <input type="text" name="address.street" [(ngModel)]="address.street"><br>
            <label>City:</label><br>
            <input type="text" name="address.city" [(ngModel)]="address.city"><br>
            <label>State:</label><br>
            <input type="text" name="address.state" [(ngModel)]="address.state"><br>
        </form>

        <h3>Posts</h3>
        <div>
        </div>
        `,
    providers:[PostsService]
})
export class UserComponent  {

    name : string;
    email: string;
    address: address;
    hobbies : string[];
    showHobbies: boolean;
    posts: Post[];

    constructor(private PostsService : PostsService){

        this.name = 'John Doe';
        this.email = 'john@gmail.com';
        this.address = {
            street : '12 Main st',
            city:'Boston',
            state: 'N/A'
        }
        this.hobbies = ['Music', 'Movies', 'Sport'];
        this.showHobbies = false;

        this.PostsService.getPosts().subscribe(posts => {
            this.posts = posts;
            console.log(posts);
        })
    }

    toggleHobbies(){

        if(this.showHobbies==true){
            this.showHobbies = false;
        }else {
            this.showHobbies = true;
        }
    }

    addHobby(hobby){
        console.log(hobby);
        this.hobbies.push(hobby);
    }

    deleteHobby(i){
        this.hobbies.splice(i, 1);
    }
}

interface address{
    street:string;
    city:string;
    state:string;
}

interface Post{
    id:number;
    title:string;
    body:string;
}