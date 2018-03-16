import { Component, OnInit } from '@angular/core';
import { StringsService } from './../services/strings.service';
import { RootScope } from './../services/root.scope';
import { Loader, Toast, Utility } from './../services/common.services';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { SugPosition } from './../directives/sug-shower/sug-shower.component';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Loader, Toast, Utility]
})
export class DashboardComponent implements OnInit {

   d_a = "vinay";
   addTemplateModal = {
     open: false
   };
   testBotSug: SugPosition;
   environment = environment;

  constructor(
  				private String: StringsService,
  				private rootScope: RootScope,
  				private Loader: Loader,
          private Toast: Toast,
          private utility: Utility,
          private router: Router
  			 ) {  
  						
  		       }

  ngOnInit() {
      this.Loader.hideRoot();
      this.loadTestBot();
      this.initTestBotSug();
      ///this.Toast.show("Welcome to dash board", 5000, "is-info")
  }

  initTestBotSug() {
    this.testBotSug = new SugPosition();
    this.testBotSug.bottom = 0;
    this.testBotSug.right = 0;
    this.testBotSug.height = 60;
    this.testBotSug.width = 100;
    this.testBotSug.leftToRight = false;
    this.testBotSug.topToBottom = false;
  }

  loadTestBot() {
    let e:HTMLScriptElement = document.createElement("script");
    e.src = ((environment.host == 'localhost') ? environment.origin : environment.host ) + "bot/build/script_prod-min.js";
    e.type = 'text/javascript';
    e.setAttribute('chat-bot-id', this.utility.getBotId(this.rootScope));
    e.setAttribute('test-bot', 'true');
    document.body.appendChild(e);
  }


  openAddTemplateModal() {
    this.router.navigate(['dashboard/add-flow']);
    this.addTemplateModal.open = true;
  }


}
