import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { VerifyVoterRequest } from './../verifyVoterRequest';
import { Hash } from './../hash';


import { ApiServiceService } from './../api-service.service';

@Component({
  selector: 'app-verify-artifact',
  templateUrl: './verify-artifact.component.html',
  styleUrls: ['./verify-artifact.component.css']
})
export class VerifyArtifactComponent implements OnInit {

  submitted = false;
  verifyVoterRequest = new VerifyVoterRequest();
  port: number;
  nodeName: string;
  queriedHash: Hash;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<VerifyArtifactComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
   }

  ngOnInit() {
    this.verifyVoterRequest = {
      hashKey: "voterHash:Wallisellen:voter:7565544294333",
      hash: "sa782h3h872adsf728hih8?",
    };
  }

  verifyArtifact(): void {
    this.submitted = true;
    this.apiService.getVoterHash(this.port, this.nodeName, this.verifyVoterRequest).then(
       hash => {
         let result: string;
         if (this.queriedHash.contentHash == this.verifyVoterRequest.hash) {
           result = "successfull verification! registered hash found: ", + JSON.stringify(this.queriedHash.contentHash) + "queried for: " + JSON.stringify(this.verifyVoterRequest.hash);
         }
         else {
           result  = "verification failed!";
         }
         this.launchConfirmationModal(result);
       }
    );
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
    this.dialogRef.close(this.verifyVoterRequest);
  }

}
