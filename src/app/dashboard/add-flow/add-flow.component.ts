import { Component, OnInit, ViewChild} from '@angular/core';
import { DashboardComponent } from './../dashboard.component';

@Component({
  selector: 'app-add-flow',
  templateUrl: './add-flow.component.html',
  styleUrls: ['./add-flow.component.css']
})
export class AddFlowComponent implements OnInit {

  constructor(
         private parent: DashboardComponent
  	) { }

  ngOnInit() {
  }


}
