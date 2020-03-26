import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { DeleteCitizenRequest } from './../deleteCitizenRequest';
import { Voter } from './../voter';
import { VoterList } from './../voterList';



import { ApiServiceService } from './../api-service.service';


@Component({
  selector: 'app-verify-er',
  templateUrl: './verify-er.component.html',
  styleUrls: ['./verify-er.component.css']
})
export class VerifyErComponent implements OnInit {

  submitted = false;
  port: number;
  nodeName: string;
  voters: Voter[] = [];
  voterList: VoterList;
  results;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<VerifyErComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
    this.voters = data.voters;
    this.voterList = data.voterList;
  }

  ngOnInit() {
  }

  verifyER(): void {
    this.submitted = true;
    this.apiService.verifyER(this.port, this.nodeName).then(
      result => {
      this.launchConfirmationModal(result);
      this.results = result;
      console.log("these are the bound results to the verify component", this.results);
    });
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

}
