import { BrowserModule} from '@angular/platform-browser';  
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteModule, routingComponents } from './app.router';
import { AppComponent } from './app.component';
import { AddTemplateComponent } from './add-template/add-template.component';


//services
import { StringsService }  from './services/strings.services';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouteModule
  ],
  providers: [ StringsService ],
  bootstrap: [AppComponent]
})
export class AppModule { 

    constructor() {
    }

}
