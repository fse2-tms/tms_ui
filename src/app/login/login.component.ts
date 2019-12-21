import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TmsserviceService } from './../service/tmsservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public errorMsg = '';

  constructor(@Inject(TmsserviceService) private tmsService, @Inject(Router) private router) { }

  ngOnInit() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userid');
  }

  signin() {
    this.errorMsg = '';
    if (this.username === '' || this.password === '') {
      this.errorMsg = 'Invalid login';
    } else {
      this.tmsService.authenticate(this.username, this.password).subscribe(response => {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('role', response.body.role);
        sessionStorage.setItem('userid', response.body.userid);
        sessionStorage.setItem('token', response.headers.get('Authorization'));
        console.log(response.body.role);
        if (response.body.role === 'RIDER') {
          this.router.navigate(['/rider']);
        }
        if (response.body.role === 'DRIVER') {
          this.router.navigate(['/driver']);
        }
        if (response.body.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
    }, error => {
      if (error.status === 401) {
        this.errorMsg = 'Invalid credentials';
      } else {
        this.errorMsg = 'Server unavailable';
      }
    });
    }
  }
}
