import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './../../services/api.services';
import { Loader, Toast } from './../../services/common.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ ApiService, Loader, Toast]
})
export class ListComponent implements OnInit {

  public Modules;
  public filteredModulesData;
  public isMenuTab;
  public isFlowTab;
  constructor(
          private Api: ApiService,
          private zone: NgZone,
          private Loader: Loader,
          private Toast: Toast,
          private route: ActivatedRoute
  	) { }

  ngOnInit() {
   
     this.getModules();
     this.setActiveTab();
       
  }


  setActiveTab() {
    this.route
      .queryParams
      .subscribe(params => {
         
           if(params.activeTab == 'menu')
             this.filterModules("menu");
           else 
             this.filterModules("flow");
        
      });
  }


  getModules() {
  	this.Api.getModules()
                 .subscribe(
                             res => { 
                                         this.zone.run(() => { // <== added
                                            this.Loader.hideRoot();
                                            console.log(res);
	                                        this.Modules = res;
	                                        this.setActiveTab();
                                         });
                                         
                                       },
                             error => { 
                                        this.zone.run(() => { // <== added
                                            this.Loader.hideRoot();
                                            this.Toast.show("Error in Auth init, Pls Try Again", 8000, "is-danger");

                                         });
                                      }
                           );
  }

  filterModules(value) {
	   this.filteredModulesData = Object.assign([], this.Modules).filter(
	      item => item.type.toLowerCase().indexOf(value.toLowerCase()) > -1
	   );
	   //switch tab in ui
	   if(value == 'menu') {
           this.isMenuTab = 'is-active';
           this.isFlowTab = '';
	   } else {
           this.isMenuTab = '';
           this.isFlowTab = 'is-active';
	   }
	}



}
