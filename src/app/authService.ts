import { UserService } from './UserService';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()

export class AuthService implements CanActivate{

    constructor(private router:Router,public service:UserService){}

    async canActivate(route){

        if(await this.service.isAuthenticated()){return true}

    this.router.navigate(['/login'])
    return false
    }

}