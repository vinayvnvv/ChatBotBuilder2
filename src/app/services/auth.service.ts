import { Injectable } from '@angular/core';
import { StringsService } from './strings.service';
import { RootScope } from './root.scope';

@Injectable()
export class AuthService {
	Strings: StringsService;
	rootScope: RootScope;
	constructor(
		str: StringsService,
		rootScope: RootScope
		) {
       this.Strings = str;
       this.rootScope = rootScope;
	}

	 isAuth() {
        if( (localStorage.getItem(this.Strings.authInstance.storageName) == "null") || (localStorage.getItem(this.Strings.authInstance.storageName) == null) || (localStorage.getItem(this.Strings.authInstance.storageName) == undefined))
        	return false;
        return true;
    }

     getAuth() {
    	return JSON.parse(localStorage.getItem(this.Strings.authInstance.storageName));
    }

     initAuth() {
      var data = JSON.parse(localStorage.getItem(this.Strings.authInstance.storageName));
      if(data == null) return;
      
      this.rootScope._auth_user.id = data[this.Strings.authInstance.storageIdKey];
      this.rootScope._auth_user.name = data[this.Strings.authInstance.storageNameKey];
      this.rootScope._auth_user.email = data[this.Strings.authInstance.storageEmailKey];
      this.rootScope._auth_user.pic = data[this.Strings.authInstance.storageAvtarKey];
    }

     setAuth(data) {
      console.log("setting auth", this.Strings.authInstance.storageName)
      localStorage.setItem(this.Strings.authInstance.storageName, JSON.stringify(data));
    }

    logout() {
      localStorage.removeItem(this.Strings.authInstance.storageName);
    }
}