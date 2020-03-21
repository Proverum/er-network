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
  citizens: Citizen[] = [];
  transitRequests: Citizen[] = [];
  voters: Voter[] = [];
  voterList: VoterList;
  hashes: Hash[] = [];
  cantonChannel: Hash[] = [];
  // also  results saved here

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
    this.getAllCitizens();
    this.getAllVoters();
    this.getWorldState();
    this.getTransitRequests();
  }

  getAllCitizens() {
    console.log("this is the port sent into getAllCitizens", this.port);
    this.apiService.getAllCitizens(this.port, this.nodeName).then(
      citizens => this.citizens = citizens,
    );
  }

  getTransitRequests() {
    console.log("this is the port sent into getAllCitizens", this.port);
    //get all citizens from the transit collections
    if (this.nodeName == "municipality") {
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityMunicipalityTwo").then(
        citizens => {
          console.log("citizens received from transitMunicipalityMunicipalityTwo", citizens);
          this.transitRequests.concat(citizens);
        }
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityMunicipalityThree").then(
        citizens => {
          console.log("citizens received from transitMunicipalityMunicipalityThree");
          this.transitRequests.concat(citizens);
        }
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityMunicipalityFour").then(
        citizens => {
          console.log("citizens received from transitMunicipalityMunicipalityFour");
          this.transitRequests.concat(citizens);
        }
      );
      //filer out the initiated request where the current reporting municipality is the municipality node itself
      this.transitRequests = this.transitRequests.filter((citizen: Citizen) => citizen.reportingMunicipality !== "Menzingen");
    }
    if (this.nodeName == "municipality2") {
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityMunicipalityTwo").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityTwoMunicipalityThree").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityTwoMunicipalityFour").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.transitRequests = this.transitRequests.filter((citizen: Citizen) => citizen.reportingMunicipality !== "Risch");
    }
    if (this.nodeName == "municipality3") {
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityMunicipalityThree").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityTwoMunicipalityThree").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityThreeMunicipalityFour").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.transitRequests = this.transitRequests.filter((citizen: Citizen) => citizen.reportingMunicipality !== "Wallisellen");
    }
    if (this.nodeName == "municipality4") {
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityMunicipalityFour").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityTwoMunicipalityFour").then(
        citizens => this.transitRequests.concat(citizens),
      );
      this.apiService.queryTransit(this.port, this.nodeName, "transitMunicipalityThreeMunicipalityFour").then(
        citizens => {
          console.log("citizens received from transitMunicipalityThreeMunicipalityFour", citizens);
          this.transitRequests = this.transitRequests.concat(citizens);
          console.log("transit Request after concat", this.transitRequests);
        }
      );
      this.transitRequests = this.transitRequests.filter((citizen: Citizen) => citizen.reportingMunicipality !== "Dübendorf");
    }

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

  launchCitizenRegistration(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName
      };
    const dialogRef = this.dialog.open(AddCitizenComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

  launchCitizenDeregistration(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName
      };
    const dialogRef = this.dialog.open(DeleteCitizenComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

  launchERCreation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName,
          citizens: this.citizens
      };
    const dialogRef = this.dialog.open(GenerateErComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

  launchCitizenRelocation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName,
          citizens: this.citizens,
      };
    const dialogRef = this.dialog.open(MoveCitizenComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

  launchCitizenRelocationAcceptance(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: this.port,
          nodeName: this.nodeName,
          transitRequests: this.transitRequests,
      };
    const dialogRef = this.dialog.open(RelocationAcceptanceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }


}
