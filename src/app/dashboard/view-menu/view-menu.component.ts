import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.services';
import { ActivatedRoute } from '@angular/router';
import { Loader, Toast, Utility} from './../../services/common.services';


@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.css'],
  providers: [ ApiService, Toast, Utility ]
})
export class ViewMenuComponent implements OnInit {

  menuData: any = [];
  isLoadingMenu: boolean = true;
  routerParams: any;
  editable = [];
  editMenu = [];
  deletable = [];
  editMenuStatus = {
      updating: false
  }

  constructor(
         private Api: ApiService,
         private activeRouter: ActivatedRoute,
         private Toast: Toast,
         private Utility: Utility
  	) { }

  ngOnInit() {

  	this.activeRouter.params.subscribe(params => {
       this.routerParams = params;
    });

    this.getMenu();

  }


  getMenu() {
  	this.Api.getFlowItem(this.routerParams.id)
                 .subscribe(
                             res => { 
                                            console.log(res);
	                                          this.menuData = res;
                                            this.isLoadingMenu = false;
                                         
                                       },
                             error => { 
                                            this.Toast.show("Error in Auth init, Pls Try Again", 8000, "is-danger");
                                            this.isLoadingMenu = false;
                                      }
                           );
  }

  showEditableForm(index, force) {
    if(!force) {
    this.menuData.menus = this.menuData.menus.filter(
                                function checkAdult(item) {
                                  return item != "";
                            });
  }
    this.editMenu = JSON.parse(JSON.stringify(this.menuData.menus));
    this.deletable = [];
    this.editable = [];
    this.editable[index] = true;
  }


  cancelEditableForm() {
     this.menuData.menus = this.menuData.menus.filter(
                                function checkAdult(item) {
                                  return item != "";
                            });
     this.editMenu = this.editMenu.filter(
                                function checkAdult(item) {
                                  return item != "";
                            });
     this.editable = [];
  }

  updateMenuItem(index) {
    if(this.editMenu[index].length != 0) {
      this.editMenuStatus.updating = true;
        var data = {
          menus: this.editMenu
        }

        this.Api.updateModule(this.menuData._id, data) 
                     .subscribe(
                          res => {
                                     console.log(res);
                                     this.menuData.menus[index] = this.editMenu[index];
                                     this.editable[index]  = false;
                                     this.Toast.show("Item Updated", 4000, "is-success");
                                     this.editMenuStatus.updating = false;
                                    
                                 },
                          err => {
                                      console.log(err)
                                      this.Toast.show("Error in Server,  Please try again!", 4000, "is-error");
                                      this.editMenuStatus.updating = false;
                                 }   
                               ); 



    }
  }

  addMenuItem() {
    if(this.editMenu[this.editMenu.length-1] == '') return;
    this.menuData.menus.push("");
    this.showEditableForm(this.menuData.menus.length-1, true);

  }

  showDeleteForm(index) {
      this.editable = [];
      this.deletable = [];
      this.deletable[index] = true;
  }


  deleteItem(index) {
       this.editMenuStatus.updating = true; 
       let temp_d_ = JSON.parse(JSON.stringify(this.menuData.menus));
       var data = {
          menus: this.Utility.removeModuleAt(temp_d_, index)
        
        }

      this.Api.updateModule(this.menuData._id, data) 
                     .subscribe(
                          res => {
                                     console.log(res);
                                     this.menuData.menus = data.menus;
                                     this.deletable[index]  = false;
                                     this.Toast.show("Item Deleted!", 4000, "is-success");
                                     this.editMenuStatus.updating = false;
                                    
                                 },
                          err => {
                                      console.log(err)
                                      this.Toast.show("Error in Server,  Please try again!", 4000, "is-error");
                                      this.editMenuStatus.updating = false;
                                 }   
                               );   


  }

}
 