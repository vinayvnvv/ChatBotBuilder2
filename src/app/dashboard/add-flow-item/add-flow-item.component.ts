import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader, Toast } from './../../services/common.services';
import { ApiService } from './../../services/api.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StringsService } from './../../services/strings.service';

@Component({
  selector: 'app-add-flow-item',
  templateUrl: './add-flow-item.component.html',
  styleUrls: ['./add-flow-item.component.css'],
  providers: [ Loader, Toast, ApiService]
})
export class AddFlowItemComponent implements OnInit {

  routerParams: any;
  private flowData = {};
  private isLoadingFlow:boolean = true;
  private formErrors = {};  
  private createFlowItemForm: FormGroup;
  private msg = [];
  private validationTypeArray: any;
  private suggestionTypeArray: any;
  constructor(
       private activeRouter: ActivatedRoute,
       private Loader: Loader,
       private Toast: Toast,
       private Api: ApiService,
       private zone: NgZone,
       private String: StringsService
  	) { }

  ngOnInit() {
  	this.activeRouter.params.subscribe(params => {
       this.routerParams = params;
    });

    console.log("selected ID", this.routerParams);
    this.validationTypeArray = this.String.validationTypeArray;
    this.suggestionTypeArray = this.String.suggestionTypeArray;
    this.getFlowItem();
    this.buildForm();

  }





  getFlowItem() {
  	this.Api.getFlowItem(this.routerParams.id)
                 .subscribe(
                             res => { 
                                         this.zone.run(() => { // <== added
                                            console.log(res);
	                                          this.flowData = res;
                                            this.isLoadingFlow = false;
                                            window["initClassAction"]();
                                         });
                                         
                                       },
                             error => { 
                                        this.zone.run(() => { // <== added
                                            this.Toast.show("Error in Auth init, Pls Try Again", 8000, "is-danger");
                                            this.isLoadingFlow = false;
                                         });
                                      }
                           );
  }




  buildForm() {
     this.createFlowItemForm = new FormGroup({
       name: new FormControl('', [Validators.required, Validators.minLength(3)]),
       msg: new FormControl([], [Validators.required]),
       beforeMsg: new FormControl([], []),
       afterMsg: new FormControl([], []),

    });

   }







}
