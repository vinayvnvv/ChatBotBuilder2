import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../../services/api.services';
import { Loader, Toast } from './../../services/common.services';
import { Router } from '@angular/router';
import { StringsService } from './../../services/strings.service';
 
@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
  providers: [Toast, Loader, ApiService, StringsService]
})
export class AddMenuComponent implements OnInit {

  matches = [];
  addMenuForm: FormGroup;
  formVars = {};
  formStatus = {
  	  mode: "",
  	  updating: false
  }

  constructor(
  		 private Api: ApiService,
         private Toast: Toast,
         private Loader: Loader,
         private zone: NgZone,
         private router: Router,
         private Strings: StringsService
  	) { }

  ngOnInit() {
  	this.buildForm();
  }

   buildForm() {
     this.addMenuForm = new FormGroup({
	     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
	     matches: new FormControl([], [Validators.required]),
	     type: new FormControl(this.Strings.menuTypes[0].value, [Validators.required]),
	     menus: new FormControl([], [Validators.required])
	  });

     this.addMenuForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); // (re)set validation messages
  }


  onValueChanged(data?: any) {
        if (!this.addMenuForm) { return; }
        const form = this.addMenuForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && (control.dirty || control.touched || !control.pristine) && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'matches': '',
        'type':'',
        'menus':''
    };

    validationMessages = {
        'name': {
            'required': 'This Field is Required!',
            'minlength': "Name Should have minimum 3 characters"
        },
        'matches': {
            'required': 'Specify atleast one match.'
        },
        'type': {
        	'required': 'Menu type is required'
        },
        'menus': {
        	'required': 'Specify atleast one menu item!'
        }
    };




  onItemAdded(e) {
    console.log(e, this.matches)
  }


  updateMenu() {
    if(!this.errorCheckFlow()) {
       return;
    }

    this.formStatus.updating = true;
    var data = this.addMenuForm.value;

     this.Api.createModule("menu", data).subscribe(
                             res => { 
                                         this.zone.run(() => { // <== added
                                            this.formStatus.updating = false;
                                            this.router.navigate(["dashboard"], { queryParams: { activeTab: "menu" }});
                                            this.Toast.show("Menu is Created!", 6000, "is-success");
                                         });
                                         
                                       },
                             error => { 
                                        this.zone.run(() => { // <== added
                                            this.formStatus.updating = false;
                                            this.Toast.show("Error in creating a new Menu!, Try again!", 8000, "is-danger");

                                         });
                                      }
                           );
  }

  errorCheckFlow() {
      if(this.addMenuForm.invalid) return false;
      return true;
  }

}
