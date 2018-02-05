import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sug-shower',
  templateUrl: './sug-shower.component.html',
  styleUrls: ['./sug-shower.component.sass']
})
export class SugShowerComponent implements OnInit {

  @Input() position: SugPosition;
  @Input() title: string;
  @Input() timeout: number;
  @Input() delay: number;
  visible: boolean = false;
  style: any = {};
  textStyle: any = {};
  constructor() { }

  ngOnInit() {
  	this.init();
  	this.initTextStyle();
  	this.handleDelay();
  }

  init() {
  		(this.position.leftToRight ? (this.style['left'] = this.position.left + "px") : ((this.style["right"] = this.position.right + "px")));
  		(this.position.topToBottom ? (this.style["top"] = this.position.top + "px") : ((this.style["bottom"] = this.position.bottom + "px")));
  		this.style["width"] = this.position.width + "px";
  		this.style["height"]= this.position.height + "px";
  }

  initTextStyle() {
  	this.textStyle['margin-left'] = "-" + (this.position.width + 30) + 'px';
  	this.textStyle['margin-top'] = "-" + (this.position.height + 10) + 'px';
  }

  handleDelay() {
  	if(this.delay) {
  		setTimeout(() => { 
  			this.visible = true;
  			this.handleTimeout();
  		 }, this.delay)
  	} else {
  		this.visible = true;
  		this.handleTimeout();
  	}
  }

  handleTimeout() {
  	if(this.timeout) {
  		setTimeout(() => { this.visible = false; } , this.timeout)
  	}
  }

}

export class SugPosition {
	top: number;
	left: number;
	bottom: number;
	right: number;
	width: number;
	height: number;
	leftToRight: boolean = true;
	topToBottom: boolean = true;
}
