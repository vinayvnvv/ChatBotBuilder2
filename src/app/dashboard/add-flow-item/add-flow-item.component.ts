import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader, Toast } from './../../services/common.services';
import { ApiService } from './../../services/api.services';

@Component({
  selector: 'app-add-flow-item',
  templateUrl: './add-flow-item.component.html',
  styleUrls: ['./add-flow-item.component.css'],
  providers: [ Loader, Toast, ApiService]
})
export class AddFlowItemComponent implements OnInit {

  routerParams: any;
  private flowData = {};
  constructor(
       private activeRouter: ActivatedRoute,
       private Loader: Loader,
       private Toast: Toast,
       private Api: ApiService,
       private zone: NgZone
  	) { }

  ngOnInit() {
  	this.activeRouter.params.subscribe(params => {
       this.routerParams = params;
    });

    console.log("selected ID", this.routerParams);
    this.getFlowItem();

  }


  getFlowItem() {
  	this.Loader.showRoot("Getting Flow..")
  	this.Api.getFlowItem(this.routerParams.id)
                 .subscribe(
                             res => { 
                                         this.zone.run(() => { // <== added
                                            this.Loader.hideRoot();
                                            console.log(res);
	                                          this.flowData = res;
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



}
