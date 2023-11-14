import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigTableComponent } from './components/config-table/config-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputingPageComponent } from './pages/computing-page/computing-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ConfigTableComponent,
    ComputingPageComponent,
    HomePageComponent,
    ToolbarComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
