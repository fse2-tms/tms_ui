import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TmsserviceService } from './../service/tmsservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allRides: any;
  interval: any;

  constructor(@Inject(TmsserviceService) private tmsService) { }

  ngOnInit() {
    this.allRides = [];
    this.getAllRides();
    this.interval = setInterval(() => {
      this.getAllRides();
    }, 10000);
   }

   ngOnDestroy() {
    if (this.interval) {
        clearInterval(this.interval);
    }
   }

  getAllRides() {
    this.tmsService.getAllRides().subscribe(response => {
      console.log(response);
      this.allRides = response;
    });
  }

}
