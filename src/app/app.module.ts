import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AutosComponent } from './components/pages/autos/autos/autos.component';
import { AutosConsultasComponent } from './components/pages/autos/autos-consultas/autos-consultas.component';
import { AutoComponent } from './components/pages/autos/auto/auto.component';
import { AppRoutingModule } from './app.routing.module';
import{HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AutosComponent,
    AutosConsultasComponent,
    AutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
