import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../services/api.services';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.sass'],
  providers: [ ApiService ]
})
export class AddTemplateComponent implements OnInit {

  @Input() action:string;
  @Input('editData')
  set editData(value:any) {
  	if(!value) return;
  	this._editData = value;
  	this.setFormVars(1);
  }
  @Input() visible: boolean;
  @Output() visibleChange :  EventEmitter<boolean> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();;

  addForm: FormGroup;
  formVars = {
  	name: "",
  	module: ""
  }
  showFormErrs: boolean = false;
  isprogress: boolean = false;
  _editData: any;

  constructor(
  		private apiService: ApiService
  	) {
   }

  ngOnInit() {
  	console.log(this.editData)
  	this.initForm();
  }

  closeModal() {
  	this.visible = false;
  	this.setFormVars(0);
    this.visibleChange.emit(this.visible);
  }

  initForm(){
  	this.addForm = new FormGroup({
       name: new FormControl('', [Validators.required]),
       module: new FormControl('', [Validators.required])
    });

    console.log(this.addForm)
  }

  setFormVars(action: number) { //1=>set, 0=>clear
  	if(action == 0) {
  		this.formVars = {
		  	name: "",
		  	module: ""
		}
  	} else {
  		this.formVars = {
  			name: this._editData.name,
  			module: JSON.stringify(this._editData.module)
  		}
  	}

  }

  submitForm(form) {
  	if(form.invalid) {
  		this.showFormErrs = true;
  		return;
  	} else {
  		this.isprogress = true;
  		try {
        	this.formVars.module = JSON.parse(this.formVars.module);
        	if(this.action == 'insert') {
	  			this.apiService.insertTemplate(this.formVars).subscribe(
	  					(res) => {
	  						this.isprogress = false;
	  						this.onClose.emit(true);
	  						this.setFormVars(0);
	  						this.closeModal();
	  					},
	  					(err) => {
	  						this.isprogress = false;
	  					}
	  				);
	  		} else {
	  			this.apiService.updateTemplate(this._editData._id, this.formVars).subscribe(
	  					(res) => {
	  						this.isprogress = false;
	  						this.onClose.emit(true);
	  						this.setFormVars(0);
	  						this.closeModal();
	  					},
	  					(err) => {
	  						this.isprogress = false;
	  					}
	  				);
	  		}
	    } catch(e) {
	        alert(e); // error in the above string (in this case, yes)!
	        this.isprogress = false;
	    }
  		

  	}
  }

}
