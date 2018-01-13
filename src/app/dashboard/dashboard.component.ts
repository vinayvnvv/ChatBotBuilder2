import { Component, OnInit } from '@angular/core';
import { StringsService } from './../services/strings.service';
import { RootScope } from './../services/root.scope';
import { Loader, Toast, Utility } from './../services/common.services';
import { environment } from './../../environments/environment';

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Loader, Toast, Utility]
})
export class DashboardComponent implements OnInit {

   d_a = "vinay";

  constructor(
  				private String: StringsService,
  				private rootScope: RootScope,
  				private Loader: Loader,
          private Toast: Toast,
          private utility: Utility
  			 ) {  
  						
  		       }

  ngOnInit() {
      this.Loader.hideRoot();
      this.loadTestBot();
      ///this.Toast.show("Welcome to dash board", 5000, "is-info")
  }

  loadTestBot() {
    let e:HTMLScriptElement = document.createElement("script");
    e.src = ((environment.host == 'localhost') ? environment.origin : environment.host ) + "bot/build/script_prod-min.js";
    e.type = 'text/javascript';
    e.setAttribute('chat-bot-id', this.utility.getBotId(this.rootScope));
    e.setAttribute('test-bot', 'true');
    document.body.appendChild(e);
  }


}
