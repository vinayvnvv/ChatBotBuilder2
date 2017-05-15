import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: "services-view",
	templateUrl: './services-view.html'
})

export class ServicesViewComponent implements OnInit {

	private tab: string = "email";

	constructor() {
		console.log("called servives view componrnt");
	}

	@Input() private ServicesData;

	ngOnInit() {
		 console.log(this.ServicesData)
	}

	changeTab(tab) {
       this.tab = tab;
	}
}