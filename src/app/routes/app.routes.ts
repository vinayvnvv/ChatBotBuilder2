import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { LoginComponent } from './../login/login.component';
import { AuthGuard } from './../services/auth.guard';


const routes : Routes = [
     { path: "", component: DashboardComponent, canActivate: [AuthGuard]},
     { path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
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
export const routingComponents = [ DashboardComponent, LoginComponent ];