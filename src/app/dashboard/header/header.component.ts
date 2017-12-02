import { Component, OnInit } from '@angular/core';
import { RootScope } from './../../services/root.scope';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenu: boolean = false;
  isGetBotModal: boolean = false;
  constructor(
       public rootScope: RootScope,
       private authService: AuthService,
       private router: Router
  	) { }

  ngOnInit() {
  }

  logout() {
  		this.authService.logout();
  		this.router.navigate(['login']);
  }

}
