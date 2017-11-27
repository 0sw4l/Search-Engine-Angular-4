import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule } from 'ng2-materialize';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import {MessageService} from './services/MessageService';
import {ApiRestService} from './services/api-rest.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzButtonModule,
    MzInputModule,
    HttpClientModule
  ],
  providers: [
    MessageService,
    ApiRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
