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

  removeModuleAt(array, at) { 
       array.splice(at, 1);
       return array;
   }

  getBotId(rootScope) {
    let Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){let t="";let n,r,i,s,o,u,a;let f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){let t="";let n,r,i;let s,o,u,a;let f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){let t="";let n=0;let r=0;let c1=0; let c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);let c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
    return Base64.encode(rootScope._auth_user.id);
  }
}