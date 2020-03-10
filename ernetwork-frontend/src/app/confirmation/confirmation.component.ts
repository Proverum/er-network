import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { Inject } from '@angular/core';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  confirmationmsg: string;

  constructor(@Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog, private dialogRef: MatDialogRef<ConfirmationComponent>) {
    this.confirmationmsg = data.confirmationmsg;
   }

  ngOnInit() {
  }

  save() {
        this.dialogRef.close(this.confirmationmsg);
    }

  close() {
     this.dialogRef.close();
  }

}
