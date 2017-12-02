import { Component } from '@angular/core';
import { RootScope } from './../services/root.scope';

@Component({
	selector: "toast",
	template: `<div class="notification {{rootScope.toast.type}} anim-2 slideInRight" *ngIf="rootScope.toast.show">
				  <button class="delete" (click)="closeToast()"></button>
				  {{rootScope.toast.text}}
			   </div>`
})
export class ToastComponent  {

    constructor(
          public rootScope: RootScope
    	) {}

    closeToast() {
    	this.rootScope.toast.show = false;
      	this.rootScope.toast.text = "";
        this.rootScope.toast.type = "";
        this.rootScope.toast.duration = 1500;
    }
}