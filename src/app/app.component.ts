import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public header = '';
  public username = '';
  public option = '';

  constructor(@Inject(Router) private router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd === true) {
        switch (router.url) {
          case('/login'):
          this.header = 'Login';
          this.username = '';
          this.option = '';
          break;
          case('/signup'):
          this.header = 'Sign Up';
          this.option = 'Sign in';
          this.username = '';
          break;
          case('/rider'):
          this.header = 'Rider';
          this.username = sessionStorage.getItem('username');
          this.option = 'Logout';
          break;
          case('/driver'):
          this.header = 'Driver';
          this.username = sessionStorage.getItem('username');
          this.option = 'Logout';
          break;
          case('/admin'):
          this.header = 'Admin';
          this.username = sessionStorage.getItem('username');
          this.option = 'Logout';
          break;
        }
      }

    });
   }

   ngOnInit() {
   }

   logout() {
     if (this.option === 'Logout') {
       sessionStorage.removeItem('token');
       sessionStorage.removeItem('username');
       sessionStorage.removeItem('role');
       sessionStorage.removeItem('userid');
       this.router.navigate(['/login']);
     }
   }

}
