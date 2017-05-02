import { Http, Response } from '@angular/http';
import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { StringsService } from './../services/strings.service';
import { RootScope } from './../services/root.scope';

@Injectable()
export class ApiService {
   constructor (
                 private _http:Http,
                 private String: StringsService,
                 private rootScope: RootScope
               ) { console.log(this.String.apis.initBotDB) }

   getModules(): Observable<any> {
    return this._http.post(this.String.apis.initBotDB + this.rootScope._auth_user.id , {})
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body   || { };
  }
}
