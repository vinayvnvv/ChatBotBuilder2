import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { LoginComponent } from './../login/login.component';
import { AuthGuard } from './../services/auth.guard';
import { AddFlowComponent } from './../dashboard/add-flow/add-flow.component';
import { ListComponent } from './../dashboard/list/list.component';
import { AddFlowItemComponent } from './../dashboard/add-flow-item/add-flow-item.component';


const routes : Routes = [
     { path: "", redirectTo: '/dashboard', pathMatch: 'full'},
     { path:"dashboard", 
       component: DashboardComponent, 
       canActivate: [AuthGuard],
       children: [
		      {
		        path: 'add-flow',
		        component: AddFlowComponent
		      },
          {
            path: 'flow-item/:id',
            component: AddFlowItemComponent
          },
          {
            path:'',
            component: ListComponent
          }
   		 ]
     },
     { path:"login", component: LoginComponent}
];

@NgModule({

	imports: [
         RouterModule.forRoot(routes)
	],
	exports:[
         RouterModule
	]
})
export class RouteModule {}
export const routingComponents = [ DashboardComponent, LoginComponent, AddFlowComponent, ListComponent ];