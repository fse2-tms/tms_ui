import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TmsserviceService } from './../service/tmsservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public driverChecked = false;
  public riderChecked = false;
  public firstCheck = true;
  public username = '';
  public password = '';
  public confirmPassword = '';
  public carModel = '';
  public carNumber = '';
  public errorMsg = '';
  public successMsg = '';

  constructor(@Inject(TmsserviceService) private tmsService, @Inject(Router) private router) { }

  ngOnInit() {
  }

  changed(user) {
    if (this.firstCheck) {
      this.firstCheck = false;
      if (user === 'driver') {
        this.driverChecked = true;
      }
      if (user === 'rider') {
        this.riderChecked = true;
      }
    } else {
      this.driverChecked = !this.driverChecked;
      this.riderChecked = !this.riderChecked;
    }
  }

  submit() {
    let role = '';
    this.errorMsg = '';
    if (this.confirmPassword === '') {
      this.errorMsg = 'Password do not match';
    }
    if (this.password === '') {
      this.errorMsg = 'Password cannot be blank';
    }
    if (this.driverChecked) {
      role = 'DRIVER';
      if (this.carModel === '') {
        this.errorMsg = 'Car model cannot be blank';
      }
      if (this.carNumber === '') {
        this.errorMsg = 'Car Number cannot be blank';
      }
    } else {
      role = 'RIDER';
    }
    if (this.username === '') {
      this.errorMsg = 'User Name cannot be blank';
    }
    if (!this.driverChecked && !this.riderChecked) {
      this.errorMsg = 'Select user type';
    }

    if (this.errorMsg.length == 0) {
      const reqObj = {
      username: this.username,
      password: this.password,
      role: role,
      carModel: this.carModel,
      carNumber: this.carNumber
    };
      this.tmsService.register(reqObj).subscribe(response => {
      if (response.status == 'user added') {
        this.router.navigate(['/login']);
      }
      if (response.status == 'username exists') {
        this.errorMsg = 'Username already exists';
      }
      if (response.status == 'Car number exists') {
        this.errorMsg = 'Car number already exists';
      }
    },
    error => {
      this.errorMsg = 'Server unavailable';
    });
    }
  }

}
