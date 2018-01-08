import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  isMenu: boolean;
  featuresData: Array<any> = [];
  specialData: Array<any> = [];
  constructor() { }

  ngOnInit() {
  	this.initFeaturesData();
  	this.initSpecialData();
  }

  initFeaturesData() {
  	this.featuresData.push({icon: "fa fa-cogs", name: "Automated", desc: "Create Flows by your requirements and it will ask questions and store the answers automatically."})
  	this.featuresData.push({icon: "fa fa-braille", name: "Real Time", desc: "Responses of the bot are realtime and fast with the latest sockets technology"});
  	this.featuresData.push({icon: "fa fa-times", name: "No Programming Language", desc: "It's Just works with the GUI, We will do all the things!"});
  }

  initSpecialData() {
  	this.specialData.push({icon: "fa fa-cogs", name: "Services", desc: "Add Api, Email and other services to flows and it makes easier to reach the people."});
  	this.specialData.push({icon: "fa fa-themeisle", name: "Custom Theme", desc: "Customize Your Bot by adding custom colors, icons."});
  	this.specialData.push({icon: "fa fa-check-circle", name: "Validators", desc: "Add predifined/custom validators to your messages in a flow."});
  }

}
