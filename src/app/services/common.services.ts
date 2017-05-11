import { Injectable } from '@angular/core';
import { RootScope } from './root.scope';

@Injectable()
export class Loader {

	constructor(
		public rootScope: RootScope
		) {}

	showRoot(title) {
    	console.log("title", title)
    	this.rootScope.rootLoader.show = true;
          if(title) {
          	this.rootScope.rootLoader.title = title;
          } else {
          	this.rootScope.rootLoader.title = "";
          }
    }

    hideRoot() {
          this.rootScope.rootLoader.show = false;
          this.rootScope.rootLoader.title = "";
    	}
}


@Injectable()
export class Toast {

  constructor(
    public rootScope: RootScope
    ) {}

  show(text:string, duration:number, type:string) {
      console.log("Toast:", text)
      if(!text) return;

      this.rootScope.toast.text = text;
      this.rootScope.toast.show = true;
      if(duration) this.rootScope.toast.duration = duration;
      if(type) this.rootScope.toast.type = type;

      setTimeout(() => {
          this.rootScope.toast.text = "";
          this.rootScope.toast.show = false;
          this.rootScope.toast.type = "";
          this.rootScope.toast.duration = 1500;
        }, duration);
          
    }

}





export class Utility {
  addModuleAt(index, data, item, type) {
     var mode;
     if(data == undefined) data = [];
     if(type == 'insert') mode = 0;
     else mode = 1;
       console.log(data, index, item);
       data.splice(index, mode, item);
       return data;  
  }
}