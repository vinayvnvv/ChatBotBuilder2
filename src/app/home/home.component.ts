import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  isMenu: boolean;
  featuresData: Array<any> = [];
  constructor() { }

  ngOnInit() {
  	this.initFeaturesData();
  }

  initFeaturesData() {
  	this.featuresData.push({icon: "fa fa-cogs", name: "Automated", desc: "Create Flows by your requirements and it will ask questions and store the answers automatically."})
  	this.featuresData.push({icon: "fa fa-braille", name: "Real Time", desc: "Responses of the bot are realtime and fast with the latest sockets technology"});
  	this.featuresData.push({icon: "fa fa-times", name: "No Programming Language", desc: "It's Just works with the GUI, We will do all the things!"});
  }

}
