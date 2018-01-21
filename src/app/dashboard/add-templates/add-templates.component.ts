import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ApiService } from './../../services/api.services';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-templates',
  templateUrl: './add-templates.component.html',
  styleUrls: ['./add-templates.component.sass'],
  providers: [ApiService]
})
export class AddTemplatesComponent implements OnInit {

  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();	
  templates:Array<any> = [];
  isProgress: boolean = false;
  isCoping: boolean = false;

  constructor(
  			private apiService: ApiService,
  			private router: Router,
  			private location: Location
  	) { }

  ngOnInit() {
  	this.getTemplates();
  	this.templates.push({name: 'Blank'})
  }

  closeModal(go_back) {
  	if(go_back)
  		this.location.back();
  	this.visible = false;
  	this.visibleChange.emit(this.visible);
  }

  getTemplates() {
  	this.isProgress = true;
  	this.apiService.getTemplates().subscribe(
  			(res) => {
  				this.templates = [];
  				this.templates.push({name: 'Blank'})
  				this.templates = this.templates.concat(res);
  				this.isProgress = false;
  			},
  			(err) => {
  				this.isProgress = false;
  			}
  		)
  }

  copyTemplates(template) {
  	if(template.name == 'Blank') {
  		this.closeModal(false);
  		return;
  	}
  	this.isCoping = true;
  	this.apiService.copyModule(template._id).subscribe(
  			(res) => {
  				this.isCoping = false;
  				this.closeModal(false);
  				this.router.navigate(['dashboard/flow-item/' + res.ops[0]._id])
  				// this.location.replaceState('dashboard/flow-item/' + res.ops[0]._id);

  				// this.router.navigateByUrl('dashboard/flow-item/' + res.ops[0]._id, );
  				
  			},
  			(err) => {
  				this.isCoping = false;
  			}
  		);
  }

}
