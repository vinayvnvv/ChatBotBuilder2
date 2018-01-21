import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  providers: [ ApiService ]
})
export class DashboardComponent implements OnInit {

  public templates:Array<any> = [];
  public templateModal:any = {
    open: false,
    action: "",
    data: {}
  }

  constructor(
  		private apiService: ApiService
  	) { }

  ngOnInit() {
  	this.getTemplates();
  }

  getTemplates() {
  	this.apiService.getTemplates()
  		.subscribe(
  				(res) => {
  					this.templates = res;
  				},
  				(err) => {

  				}
  			)
  }

  insertTemplateModal() {
    this.templateModal.action = 'insert';
    this.templateModal.data = null;
    this.templateModal.open = true;
  }

  editTemplateModal(data) {
    data = JSON.parse(JSON.stringify(data));
    this.templateModal.action = 'edit';
    this.templateModal.data = data;
    this.templateModal.open = true;
  }

  deleteTemplateModal(data) {
    this.apiService.deleteTemplate(data._id).subscribe(
        (res) => {
            this.getTemplates();
        }, 
        (err) => {

        }
      );
  }

  onInsertTemplateModalClose(modified: boolean) {
    if(modified) {
      this.getTemplates();
    }
  }

}
