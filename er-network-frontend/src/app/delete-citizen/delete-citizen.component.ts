import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { DeleteCitizenRequest } from './../deleteCitizenRequest';

import { ApiServiceService } from './../api-service.service';

@Component({
  selector: 'app-delete-citizen',
  templateUrl: './delete-citizen.component.html',
  styleUrls: ['./delete-citizen.component.css']
})
export class DeleteCitizenComponent implements OnInit {

  submitted = false;
  deleteCitizenRequest = new DeleteCitizenRequest();
  port: number;
  nodeName: string;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<DeleteCitizenComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
  }

  ngOnInit() {
    this.deleteCitizenRequest = {
      citizenKey: "CITIZEN0?",
    };
  }

  deleteCitizen(): void {
    this.submitted = true;
    this.apiService.deleteCitizen(this.port, this.nodeName, this.deleteCitizenRequest).then(result => this.launchConfirmationModal(result));
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
    this.dialogRef.close(this.deleteCitizenRequest);
  }

}
