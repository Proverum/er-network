import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";

import { ApiServiceService } from './../api-service.service';


@Component({
  selector: 'app-generate-er',
  templateUrl: './generate-er.component.html',
  styleUrls: ['./generate-er.component.css']
})
export class GenerateErComponent implements OnInit {

  submitted = false;
  port: number;
  nodeName: string;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<GenerateErComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
    this.nodeName = data.nodeName;
  }

  ngOnInit() {
  }

  createER(): void {
    this.submitted = true;
    this.apiService.createER(this.port, this.nodeName, this.addCitizenRequest).then(result => this.launchConfirmationModal(result));
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
