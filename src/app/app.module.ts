import { BrowserModule} from '@angular/platform-browser';  
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ng2-tag-input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AddFlowItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouteModule,
    TagInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
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
