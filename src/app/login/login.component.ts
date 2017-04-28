import { Component, OnInit } from '@angular/core';
import { StringsService } from './../services/strings.service';
import { AuthService } from './../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  Strings: StringsService;
  Auth: AuthService;
  public gapi;

  constructor( 
  		Strings: StringsService,
  		Auth: AuthService
  	 ) {
  	 this.Strings = Strings;
  	 this.Auth = Auth;
  }

  ngOnInit() {
  	this.gapi = window["gapi"];
  	window["authInstance"] = this.Strings;
  }
  



  googleSignIn() {
  	var params = {
       'client_id' : '617965711227-ak9h08uuhefcbn6v5ccq8io3bdh401ml.apps.googleusercontent.com',
       'cookie_policy' : 'single_host_origin',
       'ux_mode' : 'popup',
       'callback' : function(data) {
         console.log(data);
       }

    }

    

    this.gapi.auth2.init().signIn(params).then((res) => {
    	 	console.log(window["authInstance"])
          // Service.loader.hideRoot();
          // Service.loader.showRoot('Initializing!'); 
          var profile = res.getBasicProfile();

            var data = {};
            data[this.Strings.authInstance.storageIdKey] = profile.getId();
            data[this.Strings.authInstance.storageNameKey] = profile.getName();
            data[this.Strings.authInstance.storageAvtarKey] = profile.getImageUrl();
            data[this.Strings.authInstance.storageEmailKey] = profile.getEmail();

            console.log('logged Id: ' +  profile.getId())

            this.Auth.setAuth(data);
            this.Auth.initAuth();
            // Api.initBotDb().then(function(res){
            //   console.log("initDb response", res);
            //   Service.loader.hideRoot();
            //   $state.go("dashboard");
            // },function(err) {
            //   Service.loader.hideRoot();
            //   Service.Toast("There was error in initializing! Please refresh the page and login again!");
            // })
            //$state.go("dashboard");	 
    })

  }





}
