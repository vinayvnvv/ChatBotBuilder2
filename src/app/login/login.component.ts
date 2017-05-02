import { Component, OnInit, NgZone } from '@angular/core';
import { StringsService } from './../services/strings.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.services';
import { RootScope } from './../services/root.scope';
import { Loader } from './../services/common.services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService, Loader]
})
export class LoginComponent implements OnInit {
  Strings: StringsService;
  Auth: AuthService;
  public gapi;

  constructor( 
  		Strings: StringsService,
  		Auth: AuthService,
      private router: Router,
      private Api: ApiService,
      private rootScope: RootScope,
      private Loader: Loader,
      private zone: NgZone
  	 ) {
  	 this.Strings = Strings;
  	 this.Auth = Auth;
  }

  ngOnInit() {
  	this.gapi = window["gapi"];
  	window["authInstance"] = this.Strings;
  }
  



  googleSignIn() {
    this.Loader.showRoot("Authendicating..")
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
            console.log("getAuth", this.Auth.getAuth());
            

            this.Api.getModules()
                 .subscribe(
                             res => { 
                                         this.zone.run(() => { // <== added
                                            this.Loader.hideRoot();
                                         });
                                         this.router.navigate(["dashboard"]);
                                       },
                             error => { console.log("errrrr") }
                           );

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
