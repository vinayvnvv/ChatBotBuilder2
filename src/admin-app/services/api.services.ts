import { Http, Response } from '@angular/http';
import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { StringsService } from './strings.services';

@Injectable()
export class ApiService {
   constructor (
                 private _http:Http,
                 private String: StringsService
               ) {  }

   getTemplates(): Observable<any> {
        return this._http.get(this.String.apis.getTemplates)
                    .map(this.extractData);
   }

   insertTemplate(data): Observable<any> {
    return this._http.post(this.String.apis.getTemplates, data)
                    .map(this.extractData);
    }

    updateTemplate(id, data): Observable<any> {
      return this._http.post(this.String.apis.getTemplates + "/" + id, data)
                    .map(this.extractData);
    }

    deleteTemplate(id): Observable<any> {
      return this._http.delete(this.String.apis.getTemplates + "/" + id, {})
                    .map(this.extractData);
    }

   

  private extractData(res: Response) {
    let body = res.json();
    return body   || { };
  }
}



