import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { Citizen } from './../citizen';
import { MatSelectModule } from '@angular/material';
import {FormControl} from '@angular/forms';

import { ApiServiceService } from './../api-service.service';

@Component({
  selector: 'app-relocation-acceptance',
  templateUrl: './relocation-acceptance.component.html',
  styleUrls: ['./relocation-acceptance.component.css']
})
export class RelocationAcceptanceComponent implements OnInit {

  submitted = false;
  incomingRequests: Citizen[];
  port: number;
  nodeName: string;
  accepting = new FormControl();
  accpetedCitizensIndex: number[] = [1,2,3];

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<RelocationAcceptanceComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
    this.incomingRequests = data.transitRequests;
  }

  ngOnInit() {
  }

  moveCitizen(): void {
    //determine shared transit collection
    // this.selectedCitizenToMove = this.citizensAvailableToMove[this.selectedIndex];
    // if (this.nodeName == "municipality4") {
    //   if (this.citizenDestinationRequest=="Wallisellen") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityThreeMunicipalityFour"
    //   } else if (this.citizenDestinationRequest=="Risch") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityTwoMunicipalityFour"
    //   } else if (this.citizenDestinationRequest=="Menzingen") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityMunicipalityFour"
    //   }
    // }
    // if (this.nodeName == "municipality3") {
    //   if (this.citizenDestinationRequest=="Dübendorf") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityThreeMunicipalityFour"
    //   } else if (this.citizenDestinationRequest=="Risch") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityTwoMunicipalityThree"
    //   } else if (this.citizenDestinationRequest=="Menzingen") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityMunicipalityThree"
    //   }
    // }
    // if (this.nodeName == "municipality2") {
    //   if (this.citizenDestinationRequest=="Dübendorf") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityTwoMunicipalityFour"
    //   } else if (this.citizenDestinationRequest=="Wallisellen") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityTwoMunicipalityThree"
    //   } else if (this.citizenDestinationRequest=="Menzingen") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityMunicipalityTwo"
    //   }
    // }
    // if (this.nodeName == "municipality1") {
    //   if (this.citizenDestinationRequest=="Dübendorf") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityMunicipalityFour"
    //   } else if (this.citizenDestinationRequest=="Wallisellen") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityMunicipalityThree"
    //   } else if (this.citizenDestinationRequest=="Risch") {
    //     this.selectedCitizenToMove.collection = "transitMunicipalityMunicipalityTwo"
    //   }
    // }

    // this.apiService.addCitizen(this.port, this.nodeName, this.selectedCitizenToMove).then(result => this.launchConfirmationModal(result));
    // this.close();
  }

  launchConfirmationModal(result:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        confirmationmsg: result
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output from confirmation:", data)
    );
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.accpetedCitizensIndex);
  }

}
