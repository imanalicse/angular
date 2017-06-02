import { Component } from '@angular/core';
import {PostsService } from '../services/posts.service';

@Component({
    moduleId:module.id,
    selector: 'user',
    templateUrl:'user.component.html',
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

    addHobby(hobby : any){
        this.hobbies.push(hobby);
    }

    deleteHobby(i : any){
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