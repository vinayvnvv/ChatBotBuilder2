import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../home/home.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { LoginComponent } from './../login/login.component';
import { AuthGuard } from './../services/auth.guard';
import { AddFlowComponent } from './../dashboard/add-flow/add-flow.component';
import { ListComponent } from './../dashboard/list/list.component';
import { AddFlowItemComponent } from './../dashboard/add-flow-item/add-flow-item.component';
import { AddMenuComponent } from './../dashboard/add-menu/add-menu.component';
import { ViewMenuComponent } from './../dashboard/view-menu/view-menu.component';


const routes : Routes = [
     { path:"dashboard", 
       component: DashboardComponent, 
       canActivate: [AuthGuard],
       children: [
		      {
		        path: 'add-flow',
		        component: AddFlowComponent
		      },
          {
            path: 'add-menu',
            component: AddMenuComponent
          },
          {
            path: 'flow-item/:id',
            component: AddFlowItemComponent
          },
          {
            path: 'menu/:id',
            component: ViewMenuComponent
          },
          {
            path:'',
            component: ListComponent
          }
          
   		 ]
     },
     { path:"login", component: LoginComponent},
     { path: "", component: HomeComponent}
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
export const routingComponents = [ DashboardComponent, LoginComponent, AddFlowComponent, ListComponent, AddMenuComponent, ViewMenuComponent ];