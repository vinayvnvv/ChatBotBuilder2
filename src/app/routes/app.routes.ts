import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { LoginComponent } from './../login/login.component';
import { AuthGuard } from './../services/auth.guard';
import { AddFlowComponent } from './../dashboard/add-flow/add-flow.component';
import { ListComponent } from './../dashboard/list/list.component';


const routes : Routes = [
     { path: "", component: DashboardComponent, canActivate: [AuthGuard]},
     { path:"dashboard", 
       component: DashboardComponent, 
       canActivate: [AuthGuard],
       children: [
		      {
		        path: 'add',
		        component: AddFlowComponent
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