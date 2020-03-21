import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule} from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatMenuModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material';
import {MatBadgeModule, MatButtonModule, MatIconModule} from '@angular/material'
import { AppComponent } from './app.component';
import { NetworkDashboardComponent } from './network-dashboard/network-dashboard.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NodeDashboardComponent } from './node-dashboard/node-dashboard.component';
import { GenerateErComponent } from './generate-er/generate-er.component';
import { FormsModule }   from '@angular/forms';

import { ApiServiceService } from './api-service.service';
import { AddCitizenComponent } from './add-citizen/add-citizen.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DeleteCitizenComponent } from './delete-citizen/delete-citizen.component';
import { MoveCitizenComponent } from './move-citizen/move-citizen.component';
import { RelocationAcceptanceComponent } from './relocation-acceptance/relocation-acceptance.component';

const routes: Routes = [
  { path: 'home', component: NetworkDashboardComponent},
  { path: 'node-dashboard', component: NodeDashboardComponent },
  { path: 'register', component: AddCitizenComponent },
  { path: 'unregister', component: DeleteCitizenComponent },
  { path: 'generate-er', component: GenerateErComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'move', component: MoveCitizenComponent },
  { path: 'accept', component: RelocationAcceptanceComponent },
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
];


@NgModule({
  declarations: [
    AppComponent,
    NetworkDashboardComponent,
    TopBarComponent,
    NodeDashboardComponent,
    GenerateErComponent,
    AddCitizenComponent,
    ConfirmationComponent,
    DeleteCitizenComponent,
    MoveCitizenComponent,
    RelocationAcceptanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
