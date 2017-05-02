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