import { Component, OnInit } from '@angular/core';
import { Citizen } from './../citizen';
import { Voter } from './../voter';
import { VoterList } from './../voterList';
import { Hash } from './../hash';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MatDialogConfig} from "@angular/material";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { AddCitizenComponent } from './../add-citizen/add-citizen.component';
import { DeleteCitizenComponent } from './../delete-citizen/delete-citizen.component';
import { GenerateErComponent } from './../generate-er/generate-er.component';
import { MoveCitizenComponent } from './../move-citizen/move-citizen.component';
import { RelocationAcceptanceComponent } from './../relocation-acceptance/relocation-acceptance.component';
import { VerifyErComponent } from './../verify-er/verify-er.component';
import { VerifyArtifactComponent } from './../verify-artifact/verify-artifact.component';
import { ApiServiceService } from './../api-service.service';


@Component({
  selector: 'app-esp-node',
  templateUrl: './esp-node.component.html',
  styleUrls: ['./esp-node.component.css']
})
export class EspNodeComponent implements OnInit {

  port: number;
  nodeName: string;
  instantiationCase: string;
  transitRequests: Citizen[] = [];
  voters: Voter[] = [];
  voterList: VoterList;
  hashes: Hash[] = [];
  cantonChannel: Hash[] = [];
  voterVerifications: any;

  constructor(private router: Router, private dialog: MatDialog, private apiService: ApiServiceService, private dialogRef: MatDialogRef<EspNodeComponent>, @Inject(MAT_DIALOG_DATA) data) {
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
        this.instantiationCase = "Kanton Zürich"
        break;
     }
     case 8020: {
        this.nodeName = "canton2"
        this.instantiationCase = "Kanton Zug"
        break;
     }
     case 8030: {
        this.nodeName = "municipality4"
        this.instantiationCase = "Gemeinde Dübendorf"
        break;
     }
     case 8040: {
        this.nodeName = "municipality3"
        this.instantiationCase = "Gemeinde Wallisellen"
        break;
     }
     case 8050: {
        this.nodeName = "municipality"
        this.instantiationCase = "Gemeinde Menzingen"
        break;
     }
     case 8060: {
        this.nodeName = "municipality2"
        this.instantiationCase = "Gemeinde Risch"
        break;
     }
     case 8070: {
        this.nodeName = "esp"
        this.instantiationCase = "External Service Provider (Envelope/Voting Card Producer)"
        break;
     }
     case 8080: {
        this.nodeName = "sp"
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
    this.getAllVoters();
    this.getWorldState();
  }

  getAllVoters() {
    console.log("this is the port sent into getAllVoters", this.port);
    this.apiService.getAllVoters(this.port, this.nodeName).then(
      result => {
        this.voters = result[0];
        this.voterList = result[1];
      }
    );
    console.log("the voters after getAllVoters: ", this.voters);
    console.log("the voterList after getAllVoters: ", this.voterList);
  }

  getWorldState() {
    console.log("this is the port sent into getWorldState", this.port);
    this.apiService.getWorldState(this.port, this.nodeName, "erchannel").then(
       hashes => this.hashes = hashes,
    );
  }

  launchERVerification(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName,
          voters: this.voters,
          voterList: this.voterList,
      };
    const dialogRef = this.dialog.open(VerifyErComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

  launchArtifactVerification(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName,
          voters: this.voters,
          voterList: this.voterList,
      };
    const dialogRef = this.dialog.open(VerifyArtifactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

}
