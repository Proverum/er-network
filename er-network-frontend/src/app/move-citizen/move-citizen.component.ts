import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { MoveCitizenRequest } from './../moveCitizenRequest';

import { ApiServiceService } from './../api-service.service';

@Component({
  selector: 'app-move-citizen',
  templateUrl: './move-citizen.component.html',
  styleUrls: ['./move-citizen.component.css']
})
export class MoveCitizenComponent implements OnInit {

  submitted = false;
  moveCitizenRequest = new MoveCitizenRequest();
  citizenDestinationRequest: string;
  port: number;
  nodeName: string;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<DeleteCitizenComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
  }

  ngOnInit() {
    this.moveCitizenRequest = {
      key: "CITIZEN0?",
      collectionOrigin: "collectionCitizenMunicipality?",
      collectionDestination: "collectionCitizenMunicipality2?"
    };
  }

  moveCitizen(): void {
    this.submitted = true;
    if (this.citizenDestinationRequest=="Dübendorf") {
      this.moveCitizenRequest.collectionDestination = "collectionCitizen"
    }
    this.apiService.moveCitizen(this.port, this.nodeName, this.moveCitizenRequest).then(result => this.launchConfirmationModal(result));
    this.save();
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
    this.dialogRef.close(this.moveCitizenRequest);
  }

}
