import { Component } from '@angular/core';
import { RootScope } from './services/root.scope';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
     constructor(
            private rootScope: RootScope
     	) {

     }
}
