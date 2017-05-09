export class StringsService {
   port: number = 3000;
   public origin: string;
   apis: any;
   authInstance: any;
   constructor() {
   	    this.port = 3000;
   		this.origin = location.protocol + "//" + location.hostname + ":" + this.port + "/";
   		console.log("Api Origin==", this.origin)
	


	   this.authInstance = {
			storageName : "chat_bot_manager",
			storageIdKey : "chat_bot_manager_id_",
	        storageNameKey : "chat_bot_manager_name_",
	        storageEmailKey : "chat_bot_manager_email_",
	        storageAvtarKey : "chat_bot_manager_avtar_"
		};

		
		
		this.apis = {
			getModules : this.origin + "api/manager/modules/",
			getFlowItem: this.origin + "api/manager/modules/",
			updateModules: this.origin + "api/manager/modules/update/",
			deleteModules: this.origin + "api/manager/modules/delete/",
			createModules: this.origin + "api/manager/modules/create/",
			updateInitBot : this.origin + "api/manager/modules/init/",
			getInitBot : this.origin + "api/manager/modules/init/",
			initBotDB : this.origin + "api/manager/modules/init_db/"
	};

	}

	
   
}