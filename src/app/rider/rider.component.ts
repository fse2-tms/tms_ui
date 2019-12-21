import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TmsserviceService } from './../service/tmsservice.service';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit, OnDestroy {

  fromLoc = '';
  toLoc = '';
  errorMsg = '';
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
    this.tmsService.getAllRiderRides(sessionStorage.getItem('userid')).subscribe(response => {
      this.allRides = response;
    });
  }

  submit() {
    this.errorMsg = '';
    if (this.fromLoc === '' || this.toLoc === '') {
      this.errorMsg = 'Pickup and drop locations are required';
    } else {
      const reqObj = {
        riderId: sessionStorage.getItem('userid'),
        fromLoc: this.fromLoc,
        toLoc: this.toLoc
      };
      this.tmsService.requestRide(reqObj).subscribe(response => {
      this.getAllRides();
    });
    }
  }

  cancelRide(ride) {
    const reqObj = {
        rideId: ride.rideid,
        ridedate: ride.ridedate
      };
    this.tmsService.cancelRide(reqObj).subscribe(response => {
      this.getAllRides();
    });
  }
}
