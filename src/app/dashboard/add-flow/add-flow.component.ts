import { Component, OnInit, ViewChild} from '@angular/core';
import { DashboardComponent } from './../dashboard.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-flow',
  templateUrl: './add-flow.component.html',
  styleUrls: ['./add-flow.component.css']
})
export class AddFlowComponent implements OnInit {

  matches = [];
  createForm: FormGroup;
  constructor(
         private parent: DashboardComponent
  	) { }

  ngOnInit() {
  	this.buildForm();
  }


  buildForm() {
     this.createForm = new FormGroup({
	     name: new FormControl('', [Validators.required]),
	     matches: new FormControl([], [Validators.required])
	  });
  }

  onItemAdded(e) {
    console.log(e, this.matches)
  }


}
