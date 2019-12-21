import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TmsserviceService } from './../service/tmsservice.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit, OnDestroy {

  openRides: any;
  allRides: any;
  interval: any;
  driverEngaged = false;

  constructor(@Inject(TmsserviceService) private tmsserviceService) { }

  ngOnInit() {
    this.openRides = [];
    this.allRides = [];
    this.getOpenRides();
    this.getAllDriverRides();
    this.interval = setInterval(() => {
      this.getOpenRides();
      this.getAllDriverRides();
    }, 10000);
   }

   ngOnDestroy() {
    if (this.interval) {
        clearInterval(this.interval);
    }
   }

  getOpenRides() {
    this.tmsserviceService.getOpenRides().subscribe((response) => {
      this.openRides = response;
    });
  }

  getAllDriverRides() {
    this.tmsserviceService.getAllDriverRides(sessionStorage.getItem('userid')).subscribe((response) => {
      this.driverEngaged = false;
      for (let i = 0; i < response.length; i++) {
        response[i].action = '';
        if (response[i].ridestatus == 'Cab on the way') {
          this.driverEngaged = true;
          response[i].action = 'Start trip';
        }
        if (response[i].ridestatus == 'Trip started') {
          this.driverEngaged = true;
          response[i].action = 'Close trip';
        }
      }
      this.allRides = response;
    });
  }

  updateRide(ride, index) {
    let currentstatus = '';
    if (index == 'accept') {
      currentstatus = 'Cab on the way';
    } else {
      if (this.allRides[index].action == 'Start trip') {
        currentstatus = 'Trip started';
      }
      if (this.allRides[index].action == 'Close trip') {
        currentstatus = 'Completed';
      }
    }

    const reqObj = {
        rideId: ride.rideid,
        driverId: sessionStorage.getItem('userid'),
        ridedate: ride.ridedate,
        status: currentstatus
      };
    this.tmsserviceService.updateRide(reqObj).subscribe(response => {
      this.getAllDriverRides();
      this.getOpenRides();
    });
  }

}
