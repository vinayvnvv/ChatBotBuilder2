import { Component, ElementRef, OnInit} from '@angular/core';
import { RootScope } from './../services/root.scope';

@Component({
  selector: "loader",
  template: `
       <div class="loading" *ngIf="rootScope.rootLoader.show && always">
         <div class="dim"></div>
         <div class="front"> 
           <div class="info">
	            <div class="spinner"></div>
	            <div class="title">{{rootScope.rootLoader.title}}</div>
           </div> 
          </div>  

       </div>
  `
})

export class LoaderComponent implements OnInit {
	public always: boolean;
	constructor(
            public rootScope:RootScope,
            private elRef: ElementRef
		) {  }

	ngOnInit() {
		console.log(this.elRef)
	   if(this.elRef.nativeElement.attributes.getNamedItem("static") != null) this.always = false;
	   else this.always = true;
	}


}
