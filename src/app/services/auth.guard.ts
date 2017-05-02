import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '././auth.service';

@Injectable() 
export class AuthGuard implements CanActivate {

     isLogin: boolean;

    constructor(
    	 private router: Router,
    	 private Auth: AuthService
    	 ) {  } 

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log("auth-guard", next)
        if(this.Auth.isAuth()) {  
        	               
        	               return true; 
        	             }
        else {
        	  this.router.navigate(['/login']);
        	  return false;
        	}
	}  
 }
