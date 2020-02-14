import { Component, OnInit } from '@angular/core';
import { Citizen } from './../citizen';
import { Voter } from './../voter';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

import { ApiServiceService } from './../api-service.service';



@Component({
  selector: 'app-node-dashboard',
  templateUrl: './node-dashboard.component.html',
  styleUrls: ['./node-dashboard.component.css']
})
export class NodeDashboardComponent implements OnInit {

  port: number;
  nodeName: string;
  instantiationCase: string;
  citizens: Citizen[] = []
  voters: Voter[] = []

  constructor(private router: Router, private dialog: MatDialog, private apiService: ApiServiceService, private dialogRef: MatDialogRef<NodeDashboardComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.port = data.port;
  }

  ngOnInit() {
    this.assignNodeName();
    this.update();
  }

  assignNodeName(){
    switch(this.port) {
     case 8000: {
        this.nodeName = "confederation"
        this.instantiationCase = "Bund"
        break;
     }
     case 8010: {
        this.nodeName = "canton"
        this.instantiationCase = "Canton Zürich"
        break;
     }
     case 8020: {
        this.nodeName = "canton2"
        this.instantiationCase = "Canton Zug"
        break;
     }
     case 8030: {
        this.nodeName = "municipality"
        this.instantiationCase = "Gemeinde Dübendorf"
        break;
     }
     case 8040: {
        this.nodeName = "municipality2"
        this.instantiationCase = "Gemeinde Wallisellen"
        break;
     }
     case 8050: {
        this.nodeName = "municipality3"
        this.instantiationCase = "Gemeinde Menzingen"
        break;
     }
     case 8060: {
        this.nodeName = "municipality4"
        this.instantiationCase = "Gemeinde Risch"
        break;
     }
     case 8070: {
        this.nodeName = "esp"
        this.instantiationCase = "External Service Provider (Envelope/Voting Card Producer)"
        break;
     }
     case 8080: {
        this.nodeName = "post"
        this.instantiationCase = "Swiss Post"
        break;
     }
     default: {
        this.nodeName = "Unassigned Port"
        break;
     }
    }
  }

  update(){
    this.getAllCitizens();
  }

  getAllCitizens() {
    console.log("this is the port sent into getAllCitizens", this.port);
    this.apiService.getAllCitizens(this.port, this.nodeName, "queryallcitizens").then(
      citizens => this.citizens = citizens,
    );
  }


}
