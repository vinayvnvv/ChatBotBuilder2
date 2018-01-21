import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { RootScope } from './../services/root.scope';
import { environment } from './../../environments/environment';
import { StringsService } from './../services/strings.service'; 
import { Models } from './../services/models'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Toast } from './../services/common.services';
import { DashboardComponent } from './../dashboard/dashboard.component';
@Component({
  selector: 'app-get-bot',
  templateUrl: './get-bot.component.html',
  styleUrls: ['./get-bot.component.sass'],
  providers: [ Models ]
})
export class GetBotComponent implements OnInit {
  @Input() open: boolean;
  @Output() openChange :  EventEmitter<boolean> = new EventEmitter();
  chat_bot_id: string;
  host = environment.host;
  origin = environment.origin;
  view = 'code';
  suggestionTypeArray: any;
  s_msg_sub_err:boolean = false;
  botSetUpForm: FormGroup;
  isLoadingInitData: boolean = true;
  isUpdatingInitData: boolean = false;
  formVars = {
    bot_name: null,
    msg: [],
    shortcut: null,
    shortcutData: [],
    style: {
       bgcolor: "#d9d9d9",
       color: "#d9d9d9",
       height: null,
       positionX: null,
       positionY: null,
       width: null
    }
  };
  closeModal() {
  	this.open = false; 
    this.view = 'code';
    this.openChange.emit(this.open);
  }

  constructor(
  		private rootScope: RootScope,
      private http: Http,
      private Strings: StringsService,
      private Models: Models,
      private Toast: Toast,
      private dashboard: DashboardComponent
  	) { 
  }

  ngOnInit() {
    this.initVars();
  	this.getBotId();
    this.buildForm();
  }

  initVars() {
    this.suggestionTypeArray = this.Strings.suggestionTypeArray;
    this.formVars.shortcut = this.suggestionTypeArray[0].value;
  }

  goView(view) {
    this.view = view;
    if(view == 'setup')
      this.getBotSetupData();
  }

  getBotSetupData() {
    this.isLoadingInitData = true;
    this.http.post(this.Strings.apis.getInitBot + this.rootScope._auth_user.id, {}).subscribe(
      (res) => {
        let data = res.json()[0];
        this.formVars = data;
        if(!data.shortcut) this.formVars.shortcut = this.suggestionTypeArray[0].value;
        this.isLoadingInitData = false;
      }, 
      (err) => {

      }
    )
  }

  updateBotSetupData() {
      if(this.botSetUpForm.valid) {
        this.isUpdatingInitData = true;
        let data = this.Models.initBot(this.formVars);
        this.http.post(this.Strings.apis.updateInitBot + this.rootScope._auth_user.id, data).subscribe(
            (res) => {
                this.isUpdatingInitData = false;
                this.Toast.show("Bot Setup is updated!", 4000, "is-success");
                this.dashboard.loadTestBot();
            },
            (err) => {
                this.isUpdatingInitData = false;
                this.Toast.show("Error in Server,  Please try again!", 4000, "is-error");
            }
        );
      }
  }


  getBotId() {
  	let Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){let t="";let n,r,i,s,o,u,a;let f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){let t="";let n,r,i;let s,o,u,a;let f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){let t="";let n=0;let r=0;let c1=0; let c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);let c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
  	this.chat_bot_id = Base64.encode(this.rootScope._auth_user.id);
  }



  //form
  buildForm() {
     this.botSetUpForm = new FormGroup({
       bot_name: new FormControl('', [Validators.required]),
       msg: new FormControl([], [Validators.required]),
       shortcut: new FormControl(this.suggestionTypeArray[0].value),
       shortcutData: new FormControl([]),
       bgcolor: new FormControl([''], [Validators.required]),
       color: new FormControl([''], [Validators.required]),
       height: new FormControl([''], [Validators.required]),
       positionX: new FormControl([''], [Validators.required]),
       positionY: new FormControl([''], [Validators.required]),
       width: new FormControl([''], [Validators.required])
    });

     this.botSetUpForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); // (re)set validation messages
  }


  onValueChanged(data?: any) {
        if (!this.botSetUpForm) { return; }
        const form = this.botSetUpForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && (control.dirty || control.touched || !control.pristine) && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'bot_name': '',
        'msg': '',
        'shortcut': '',
        'shortcutData':'',
        'bgcolor':'',
        'color':'',
        'width':'',
        'height':'',
        'positionX':'',
        'positionY':''
    };

    validationMessages = {
        'bot_name': {
            'required': "Specify the name of the bot"
        },
        'msg': {
            'required': 'Specify atleast on messsage!'
        },
        'shortcut': {
            'required': 'Specify atleast one match.'
        },
        'shortcutData': {
            'required': 'Specify atleast one suggestion!.'
        },
        'bgcolor': {
            'required': 'Specify Bot Theme Color.'
        },
        'color': {
            'required': 'Specify Bot theme text color.'
        },

        'width': {
            'required': 'Specify width of the Bot.'
        },
        'height': {
            'required': 'Specify height of the bot.'
        },
        'positionX': {
            'required': 'Specify bot horizantal position.'
        },
        'positionY': {
          'required': 'Specify bot vertical position.'
        },
        'menus': {
          'required': 'Specify atleast one menu item!'
        }
    };



}
