import { BrowserModule} from '@angular/platform-browser';  
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ngx-chips'; 
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './directives/loader.directive';
import { ToastComponent } from './directives/toast.directive';
import { SubLoaderComponent } from './directives/sub-loader.directive';

//global services
import { StringsService } from './services/strings.service';
import { RootScope } from './services/root.scope';
import { AuthService } from './services/auth.service';

//routes
import { RouteModule } from './routes/app.routes';
import { routingComponents } from './routes/app.routes';
import { AuthGuard } from './services/auth.guard';


import { AddFlowComponent } from './dashboard/add-flow/add-flow.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ListComponent } from './dashboard/list/list.component';
import { AddFlowItemComponent } from './dashboard/add-flow-item/add-flow-item.component';
import { ServicesViewComponent } from './dashboard/add-flow-item/childs/services-view.component';
import { AddMenuComponent } from './dashboard/add-menu/add-menu.component';
import { ViewMenuComponent } from './dashboard/view-menu/view-menu.component';

//directives
import { AutoTag } from './directives/auto-tag';
import { GetBotComponent } from './get-bot/get-bot.component';
import { ModulesLoaderComponent } from './directives/modules-loader/modules-loader.component';
import { HomeComponent } from './home/home.component';
import { AddTemplatesComponent } from './dashboard/add-templates/add-templates.component';
import { FixAtTop } from './directives/fix-at-top.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    DashboardComponent,
    LoaderComponent,
    SubLoaderComponent,
    ToastComponent,
    AddFlowComponent,
    HeaderComponent,
    ListComponent,
    AddFlowItemComponent,
    ServicesViewComponent,
    AddMenuComponent,
    ViewMenuComponent,
    AutoTag,
    GetBotComponent,
    ModulesLoaderComponent,
    HomeComponent,
    AddTemplatesComponent,
    FixAtTop
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouteModule,
    TagInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MomentModule,
    ColorPickerModule
  ],
  providers: [StringsService , RootScope, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 

    constructor(private Auth: AuthService) {
        console.log("init")
        Auth.initAuth();
    }

}
