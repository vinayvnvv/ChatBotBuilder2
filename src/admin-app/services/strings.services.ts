import { environment } from './../../environments/environment';
export class StringsService {
   port: number = 3000;
   public origin: string;
   apis: any;
   authInstance: any;
   validationTypeArray: any;
   suggestionTypeArray: any;
   menuTypes: any;
   constructor() {
   	    this.port = 3000;
   		this.origin = environment.origin;
   		console.log("Api Origin==", this.origin)
	
		
		this.apis = {
			getTemplates : this.origin + "api/admin/templates",
		};
	}

   
}