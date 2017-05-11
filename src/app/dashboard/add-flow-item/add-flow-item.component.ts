import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader, Toast, Utility} from './../../services/common.services';
import { ApiService } from './../../services/api.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StringsService } from './../../services/strings.service';
import { Models } from './../../services/models';

@Component({
  selector: 'app-add-flow-item',
  templateUrl: './add-flow-item.component.html',
  styleUrls: ['./add-flow-item.component.css'],
  providers: [ Loader, Toast, ApiService, Models, Utility]
})
export class AddFlowItemComponent implements OnInit {

  routerParams: any;
  private flowData: any = [];
  private isLoadingFlow:boolean = true;
  private createFlowItemForm: FormGroup;
  private msg = [];
  private s_e_msg = [];
  private v_e_msg = [];
  private validationTypeArray: any;
  private suggestionTypeArray: any;
  private isActiveModal: boolean = false;
  private editFlowItemIndex: number = null;
  private msg_sub_err: boolean = false;
  private updateFlowType: any;
  private isLoadingeditFlowItem: boolean = false;
  private updateMsg: string;
  constructor(
       private activeRouter: ActivatedRoute,
       private Loader: Loader,
       private Toast: Toast,
       private Api: ApiService,
       private zone: NgZone,
       private String: StringsService,
       private Models: Models,
       private Utility: Utility
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
       validate: new FormControl(this.validationTypeArray[0].value,[]),
       validateErrMsg: new FormControl([],[]),
       shortcut: new FormControl(this.suggestionTypeArray[0].value,[]),
       shortcutData: new FormControl([],[]),

    });

     this.createFlowItemForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

     //this.onValueChanged(); // (re)set validation messages


   }


   onValueChanged(data?: any) {

        if (!this.createFlowItemForm) { return; }
        const form = this.createFlowItemForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty  && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }


    formErrors = {
        'name': '',
        'msg': '',
        'validateErrMsg':'',
        'shortcutData':''
    };

    validationMessages = {
        'name': {
            'required': 'This Field is Required!',
            'minlength': "Name Should have minimum 3 characters"
        },
        'msg': {
            'required': 'Specify atleast one message.'
        },
        'validateErrMsg': {
            'required': 'Specify atleast one Validation error message.'
        },
        'shortcutData': {
            'required': 'Specify atleast one Suggestion item.'
        }

    };

    openEditFlowItem(index, type) {
      this.buildForm();
      this.msg_sub_err = false;
      this.isActiveModal = true;
      this.editFlowItemIndex = index;
      this.updateFlowType = type;
      if(type == 'edit') {
        this.createFlowItemForm.setValue(this.flowData.modules[index]);
        if(this.createFlowItemForm.value.validate == null) this.createFlowItemForm.patchValue({validate: this.String.validationTypeArray[0].value});
        if(this.createFlowItemForm.value.shortcut == null) this.createFlowItemForm.patchValue({shortcut: this.String.suggestionTypeArray[0].value});
      }
    }

    



   updateFlowItem() {
      if(this.updateFlowType == 'edit') {  //update
          this.flowData.modules = this.Utility.addModuleAt(this.editFlowItemIndex, this.flowData.modules, this.createFlowItemForm.value, "edit");
          this.updateMsg = "Flow Updated Succesfully!";
      } else {   //insert
          this.flowData.modules = this.Utility.addModuleAt(this.editFlowItemIndex, this.flowData.modules, this.createFlowItemForm.value, "insert");
          this.updateMsg = "Flow inserted Succesfully!";
      }
 
       this.isLoadingeditFlowItem = true;
       this.isActiveModal = false;
       
       var data = { modules: this.flowData.modules };

       this.Api.updateModule(this.flowData._id, data) 
                     .subscribe(
                          res => {
                                     console.log(res);
                                     this.isLoadingeditFlowItem = false;
                                     this.Toast.show(this.updateMsg, 4000, "is-success");
                                    
                                 },
                          err => {
                                      console.log(err)
                                      this.isLoadingeditFlowItem = false;
                                      this.Toast.show("Error in Server,  Please try again!", 4000, "is-error");
                                 }  
                               );      

   }




}
