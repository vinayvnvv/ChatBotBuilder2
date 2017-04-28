import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//global services
import { StringsService } from './services/strings.service';
import { RootScope } from './services/root.scope';

//routes
import { RouteModule } from './routes/app.routes';
import { routingComponents } from './routes/app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouteModule
  ],
  providers: [ StringsService , RootScope ],
  bootstrap: [AppComponent]
})
export class AppModule { }
