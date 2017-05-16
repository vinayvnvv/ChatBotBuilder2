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
	private emailServiceEditMode: string;

	constructor(
            private Utility: Utility,
            private Api: ApiService
		) {
		console.log("called servives view componrnt");
	}

	@Input() private ServicesData;

	ngOnInit() {
		 this.buildEmailServiceForm();
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
            'required': 'Specify atleast one Validation error message.'
        },
        'body': {
            'required': 'Specify Body of the email.'
        }

    };

	openEmailServiceModal(mode, index) {
        this.isEditEmailServiceModal = true;
        this.emailServiceEditMode = mode;

	}

	updateEmailService() {
	   this.emailServiceFormErr = true;
	   if(this.emailServiceForm.valid) {
            if(this.emailServiceEditMode == 'insert') {
            	this.Utility.addModuleAt(0, this.ServicesData, this.emailServiceForm.value, "insert");
            }
	   }
	}
}