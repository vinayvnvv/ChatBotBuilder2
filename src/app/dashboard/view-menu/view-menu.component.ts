import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.services';
import { ActivatedRoute } from '@angular/router';
import { Loader, Toast, Utility} from './../../services/common.services';


@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.css'],
  providers: [ ApiService, Toast ]
})
export class ViewMenuComponent implements OnInit {

  private menuData: any = [];
  private isLoadingMenu: boolean = true;
  private routerParams: any;

  constructor(
         private Api: ApiService,
         private activeRouter: ActivatedRoute,
         private Toast: Toast
  	) { }

  ngOnInit() {

  	this.activeRouter.params.subscribe(params => {
       this.routerParams = params;
    });

    this.getMenu();

  }


  getMenu() {
  	this.Api.getFlowItem(this.routerParams.id)
                 .subscribe(
                             res => { 
                                            console.log(res);
	                                        this.menuData = res;
                                            this.isLoadingMenu = false;
                                         
                                       },
                             error => { 
                                            this.Toast.show("Error in Auth init, Pls Try Again", 8000, "is-danger");
                                            this.isLoadingMenu = false;
                                      }
                           );
  }

}
