class ModuleFlow {
      public name;
      public msg;
      public beforeMsg;
      public afterMsg;
      public validate;
      public validateErrMsg;
      public shortcut;
      public shortcutData;
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
       	  model.validateErrMsg = [];

       	} else { 
       		model.validate = m.validate;
       		if(m.validateErrMsg == undefined || m.validateErrMsg == '' || m.validateErrMsg == null || m.validateErrMsg.length == 0) model.validateErrMsg = [];
       		else model.validateErrMsg = m.validateErrMsg;

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
}
