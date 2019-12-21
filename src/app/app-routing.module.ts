import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RiderComponent } from './rider/rider.component';
import { DriverComponent } from './driver/driver.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
  {path: 'login', component: LoginComponent},
  {path: 'rider', component: RiderComponent, canActivate: [AuthGuardService] },
  {path: 'driver', component: DriverComponent, canActivate: [AuthGuardService] },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  {path: 'signup', component: SignupComponent },
  {path: '**', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
