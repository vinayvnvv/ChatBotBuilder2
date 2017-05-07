import { Component, OnInit } from '@angular/core';
import { RootScope } from './../../services/root.scope';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
       private rootScope: RootScope
  	) { }

  ngOnInit() {
  }

}
