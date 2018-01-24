export class ValidateParams {
  public pattern: string;
}

export class ValidateModule {
  public type: string;
  public errMsg: Array<string> = [];
  public params: ValidateParams;
}

export class ModuleFlow {
      public name: string;
      public msg: Array<string> = [];
      public beforeMsg: Array<string> = [];
      public afterMsg: Array<string> = [];
      public validate: ValidateModule;
      public shortcut;
      public shortcutData: Array<string> = [];
}

class InitBot {
      public bot_name;
      public msg;
      public shortcut;
      public shortcutData;
      public style = {
            bgcolor: null,
            color: null,
            width: null,
            height: null,
            positionX: null,
            positionY: null
      }
}

export class Models {
	moduleItems(m) {
       let model = new ModuleFlow();
       if(m.name == undefined || m.name == '' || m.name == null) model.name = "Name Not Specified!";
       else model.name = m.name;

       if(m.msg == undefined || m.msg == '' || m.msg == null || m.msg.length == 0 ) model.msg = ["Msg Not Specified!"];
       else model.msg = m.msg;

       if(m.beforeMsg == undefined || m.beforeMsg == '' || m.beforeMsg == null  ) model.beforeMsg = [];
       else model.beforeMsg = m.beforeMsg;

       if(m.afterMsg == undefined || m.afterMsg == '' || m.afterMsg == null  ) model.afterMsg = [];
       else model.afterMsg = m.afterMsg;

       if(m.afterMsg == undefined || m.afterMsg == '' || m.afterMsg == null  ) model.afterMsg = [];
       else model.afterMsg = m.afterMsg;

       if(m.validate == undefined || m.validate == '' || m.validate == null || m.validate == 'none' ) {
       	  model.validate = null;
       	  //model.validate.errMsg = [];

       	} else { 
          model.validate = new ValidateModule();
       		model.validate.type = m.validate;
       		if(m.validateErrMsg == undefined || m.validateErrMsg == '' || m.validateErrMsg == null || m.validateErrMsg.length == 0) model.validate.errMsg = [];
       		else model.validate.errMsg = m.validateErrMsg;
          if(m.validate == 'pattern') {
            model.validate.params = new ValidateParams();
            if(m.validatePattern == undefined || m.validatePattern == '' || m.validatePattern == null) {
              model.validate.params.pattern = '';
            } else{
              model.validate.params.pattern = m.validatePattern;
            }
          }
           

       	}

        if(m.shortcut == undefined || m.shortcut == '' || m.shortcut == null || m.shortcut == 'none') {
             	  model.shortcut = null;
             	  model.shortcutData = [];

             	} else { 
             		model.shortcut = m.shortcut;
             		if(m.shortcutData == undefined || m.shortcutData == '' || m.shortcutData == null || m.shortcutData.length == 0) model.shortcutData = [];
             		else model.shortcutData = m.shortcutData;

        }
         return model; 	
	}

     initBot = function(m) {
       let model = new InitBot();
         if(!m.bot_name || m.bot_name == '') model.bot_name = null;
         else model.bot_name = m.bot_name;
         if(m.msg == undefined || m.msg == null || m.msg == '') model.msg = "Welcome!";
         else model.msg = m.msg;

         if(m.shortcut == undefined || m.shortcut == '' || m.shortcut == null || m.shortcut == 'none') {
                model.shortcut = null;
                model.shortcutData = [];

              } else { 
                     model.shortcut = m.shortcut;
                     if(m.shortcutData == undefined || m.shortcutData == '' || m.shortcutData == null || m.shortcutData.length == 0) {
                       model.shortcut = null;
                       model.shortcutData = [];    
                     } else {
                           model.shortcutData = m.shortcutData;
                     }

              }

          model.style = m.style;    
        return model;      
     }
}

