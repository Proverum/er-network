import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { NewCitizenRequest } from './../newCitizenRequest';

import { ApiServiceService } from './../api-service.service';


@Component({
  selector: 'app-add-citizen',
  templateUrl: './add-citizen.component.html',
  styleUrls: ['./add-citizen.component.css']
})
export class AddCitizenComponent implements OnInit {

  submitted = false;
  addCitizenRequest = new NewCitizenRequest();
  port: number;
  nodeName: string;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<AddCitizenComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
   }

  ngOnInit() {
    //pre populate the request for ease of demonstration
    this.addCitizenRequest = {
      vn: "756.2342.8762.54",
      localPersonId: "StubId",
      firstName: "Max",
      officialName: "Muster",
      dateOfBirth: "25.09.1975",
      placeOfBirth: "Stubplace",
      sex: "Stubsex",
      religion: "Stubreligion",
      maritalStatus: "Stubsingle",
      nationality: "Schweiz",
      originName: "StubOrigin",
      canton: "Stubcanton",
      residencePermit: "Stubpermit",
      reportingMunicipality: "Dübendorf",
      typeOfResidenceType: "Hauptwohnsitz",
      arrivalDate: "Stubdate",
      street: "StubStreet",
      postOfficeBoxText: "Stubpostbox",
      city: "Stubcity",
      swissZipCode: "StubZipCode",
      typeOfHousehold: "StubType",
      collection: "collectionCitizenMunicipality",
      citizenKey: "CITIZENX",
    };
  }

  addCitizen(): void {
    this.submitted = true;
    this.apiService.addCitizen(this.port, this.nodeName, this.addCitizenRequest).then(result => this.launchConfirmationModal(result));
    this.close();
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
    this.dialogRef.close(this.addCitizenRequest);
  }


}
