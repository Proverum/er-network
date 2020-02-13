import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworkDashboardComponent } from './network-dashboard/network-dashboard.component';
import { MunicipalityInterfaceComponent } from './municipality-interface/municipality-interface.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NetworkDashboardComponent,
    MunicipalityInterfaceComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    RouterModule.forRoot([
      { path: '', component: NetworkDashboardComponent },
      { path: 'municipality/:productId', component: MunicipalityInterfaceComponent }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
