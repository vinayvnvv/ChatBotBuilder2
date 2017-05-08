import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { DashboardComponent } from './../dashboard.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../../services/api.services';
import { Loader, Toast } from './../../services/common.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flow',
  templateUrl: './add-flow.component.html',
  styleUrls: ['./add-flow.component.css'],
  providers: [Toast, Loader, ApiService]
})
export class AddFlowComponent implements OnInit {

  matches = [];
  createForm: FormGroup;
  isCreating:boolean = false;
  constructor(
         private parent: DashboardComponent,
         private Api: ApiService,
         private Toast: Toast,
         private Loader: Loader,
         private zone: NgZone,
         private router: Router
  	) { }

  ngOnInit() {
  	this.buildForm();
  }


  buildForm() {
     this.createForm = new FormGroup({
	     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
	     matches: new FormControl([], [Validators.required])
	  });

     this.createForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); // (re)set validation messages
  }


  onValueChanged(data?: any) {
        if (!this.createForm) { return; }
        const form = this.createForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'matches': ''
    };

    validationMessages = {
        'name': {
            'required': 'This Field is Required!',
            'minlength': "Name Should have minimum 3 characters"
        },
        'matches': {
            'required': 'Specify atleast one match.'
        }
    };




  onItemAdded(e) {
    console.log(e, this.matches)
  }


  createFlow() {
    if(!this.errorCheckFlow()) {
       return;
    }

    this.isCreating = true;
    var data = {
                 "name" : this.createForm.value.name,
                 "matches": this.createForm.value.matches
          };

     this.Api.createModule("flow", data).subscribe(
                             res => { 
                                         this.zone.run(() => { // <== added
                                            this.isCreating = false;
                                            this.router.navigate(["dashboard"]);
                                            this.Toast.show("Module is Created!", 6000, "is-success");
                                         });
                                         
                                       },
                             error => { 
                                        this.zone.run(() => { // <== added
                                            this.isCreating = false;
                                            this.Toast.show("Error in creating a new Flow!, Try again!", 8000, "is-danger");

                                         });
                                      }
                           );
  }

  errorCheckFlow() {
      if(this.createForm.invalid) return false;
      return true;
  }


}
