import { Component, OnInit } from '@angular/core';
import { StringsService } from './../services/strings.service';
import { RootScope } from './../services/root.scope';
import { Loader, Toast } from './../services/common.services';

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Loader, Toast]
})
export class DashboardComponent implements OnInit {

  public d_a = "vinay";

  constructor(
  				private String: StringsService,
  				private rootScope: RootScope,
  				private Loader: Loader,
          private Toast: Toast
  			 ) {  
  						
  		       }

  ngOnInit() {
      this.Loader.hideRoot();
      console.log(this.rootScope)
      this.Toast.show("Welcome to dash board", 5000, "is-info")
  }

}
