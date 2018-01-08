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
  atTop: boolean = true;
  constructor(
       public rootScope: RootScope,
       private authService: AuthService,
       private router: Router
  	) { }

  ngOnInit() {
    this.listenOnBodyScroll();
  }

  logout() {
  		this.authService.logout();
  		this.router.navigate(['login']);
  }

  listenOnBodyScroll() {
    window.addEventListener("scroll", (e) => {
      let el:HTMLElement = e.target['scrollingElement'];
      if(el.scrollTop == 0)
        this.atTop = true;
      else this.atTop = false;
    });

}

}
