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
import { HttpClientModule } from '@angular/common/http';
import { IpRechnerService } from './services/ip-rechner.service';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ConfigTableComponent,
    ComputingPageComponent,
    HomePageComponent,
    ToolbarComponent
  ],
  imports: [
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [IpRechnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
