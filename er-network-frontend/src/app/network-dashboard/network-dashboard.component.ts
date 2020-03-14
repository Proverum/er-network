import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule } from "@angular/material";
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { MatDialogConfig} from "@angular/material";

import { NodeDashboardComponent } from '../node-dashboard/node-dashboard.component';


@Component({
  selector: 'app-network-dashboard',
  templateUrl: './network-dashboard.component.html',
  styleUrls: ['./network-dashboard.component.css']
})
export class NetworkDashboardComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchDashboard(nodePort: number){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '85%';
    dialogConfig.height = '85%';
    dialogConfig.data = {
          port: nodePort
      };
    const dialogRef = this.dialog.open(NodeDashboardComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
  }

}
