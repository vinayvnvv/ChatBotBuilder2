import { Component, OnInit } from '@angular/core';
import { StringsService } from './../services/strings.service';
import { RootScope } from './../services/root.scope';
import { Loader } from './../services/common.services';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Loader]
})
export class DashboardComponent implements OnInit {

  constructor(
  				private String: StringsService,
  				private rootScope: RootScope,
  				private Loader: Loader
  			 ) {  
  						
  		       }

  ngOnInit() {
      this.Loader.hideRoot();
      console.log(this.rootScope)
  }

}
