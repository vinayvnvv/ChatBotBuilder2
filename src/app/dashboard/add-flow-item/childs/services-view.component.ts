import { Component, Input, OnInit } from '@angular/core'
import { ApiService } from './../../../services/api.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Loader, Toast, Utility} from './../../../services/common.services';

@Component({
	selector: "services-view",
	templateUrl: './services-view.html',
	providers: [ Utility, ApiService]
})

export class ServicesViewComponent implements OnInit {

	private tab: string = "email";
	private isEditEmailServiceModal:boolean = false;
	private emailServiceForm: FormGroup;
	private emailServiceFormErr: boolean = false;
	private emailServiceEditStatus = {
		   mode:"",
		   index: -1,
		   updating: false
	};
  private emailServiceDeleteStatus = {
       isModal: false,
       index: -1,
       updating: false
  }

	constructor(
            private Utility: Utility,
            private Api: ApiService,
            private Toast: Toast
		) {
		console.log("called servives view componrnt");
	}

	@Input() private ServicesData;

	ngOnInit() {
		 this.buildEmailServiceForm();
		 console.log(this.ServicesData)
	}

	changeTab(tab) {
       this.tab = tab;
	}


	buildEmailServiceForm() {
		this.emailServiceForm = new FormGroup({
      		 name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      		 to: new FormControl([], [Validators.required]),
      		 subject: new FormControl("", [Validators.required]),
      		 body: new FormControl("", [Validators.required])
      	  });

		 this.emailServiceForm.valueChanges
            .subscribe(data => this.onEmailServiceFormValueChanged(data));

     	 this.onEmailServiceFormValueChanged(); // (re)set validation messages

	}

	onEmailServiceFormValueChanged(data?: any) {
         if (!this.emailServiceForm) { return; }
        const form = this.emailServiceForm;

        for (const field in this.emailServiceFormErrors) {
            // clear previous error message (if any)
            this.emailServiceFormErrors[field] = '';
            const control = form.get(field);

            if (control && (control.dirty || control.touched)  && !control.valid) {
                const messages = this.emailServiceFormValidationMessages[field];
                for (const key in control.errors) {
                    this.emailServiceFormErrors[field] += messages[key] + ' ';
                }
            }
        }
	}

	emailServiceFormErrors = {
        'name': '',
        'to': '',
        'subject':'',
        'body':''
    };

    emailServiceFormValidationMessages = {
        'name': {
            'required': 'This Field is Required!',
            'minlength': "Name Should have minimum 3 characters"
        },
        'to': {
            'required': 'Specify atleast one recipient.'
        },
        'subject': {
            'required': 'Specify Subject of the email.'
        },
        'body': {
            'required': 'Specify Body of the email.'
        }

    };

	openEmailServiceModal(mode, index) {
		console.log("index", index)
		this.emailServiceForm.reset();
		if(mode == 'edit')
			this.emailServiceForm.setValue(this.ServicesData.services.email[index]);
        this.isEditEmailServiceModal = true;
        this.emailServiceEditStatus.mode = mode;
        this.emailServiceEditStatus.index = index;

	}

	updateEmailService() {
	   this.emailServiceFormErr = true;
	   let emailData;
	   if(this.emailServiceForm.valid) {
	   	this.emailServiceEditStatus.updating = true;
            if(this.emailServiceEditStatus.mode == 'insert') {
            	emailData = this.Utility.addModuleAt(0, this.ServicesData.services.email, this.emailServiceForm.value, "insert");
            } else {
            	emailData = this.Utility.addModuleAt(this.emailServiceEditStatus.index, this.ServicesData.services.email, this.emailServiceForm.value, "edit");
            }

          this.ServicesData.services.email = emailData; 
          let data = {
               	  "services.email": emailData
               }  
          this.Api.updateModule(this.ServicesData._id, data) 
                     .subscribe(
                          res => {
                                     console.log(res);
                                     this.emailServiceEditStatus.updating = false;
                                     this.Toast.show("Email Service is updated!", 4000, "is-success");
                                     this.isEditEmailServiceModal = false;       
                                 },
                          err => {
                                      console.log(err)
                                      this.emailServiceEditStatus.updating = false;
                                      this.Toast.show("Error in Server,  Please try again!", 4000, "is-error");
                                 }  
                               );           
	   }
	}

  openDeleteEmailServiceModal(index) {
    console.log("delete call")
    this.emailServiceDeleteStatus.index = index;
    this.emailServiceDeleteStatus.isModal = true;
  }

  deleteEmailService() {
       this.emailServiceDeleteStatus.updating = true;
       let emailData;
       let ser_temp = JSON.parse(JSON.stringify(this.ServicesData.services.email));
       emailData = this.Utility.removeModuleAt(ser_temp, this.emailServiceDeleteStatus.index);
       let data = {
                   "services.email": emailData
               };
          this.Api.updateModule(this.ServicesData._id, data) 
                     .subscribe(
                          res => {
                                     console.log(res);
                                     this.emailServiceDeleteStatus.updating = false;
                                     this.Toast.show("Email Service is Deleted!", 4000, "is-success");
                                     this.ServicesData.services.email = emailData;    
                                     this.emailServiceDeleteStatus.isModal = false;  
                                 },
                          err => {
                                      console.log(err)
                                      this.emailServiceDeleteStatus.updating = false;
                                      this.Toast.show("Error in Server,  Please try again!", 4000, "is-error");
                                 }  
                               );           
     
  }
}