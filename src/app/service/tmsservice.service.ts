import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmsserviceService {

  private baseURL = environment.baseURL;
  // private baseURL = 'http://ec2-13-234-202-173.ap-south-1.compute.amazonaws.com/';
  private authserver = 'authserver';
  private rideserver = 'rideserver';
  private riderserver = 'riderserver';
  private driverserver = 'driverserver';
  private headers = HttpHeaders;

  constructor(private http: HttpClient) { }

  public register(reqObj) {
    return this.http.post(this.baseURL + this.authserver + '/register', reqObj)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public authenticate(username, password) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.http.post(this.baseURL + this.authserver + '/authenticate', null, {
    // return this.http.post('http://localhost:1111/authenticate', null, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(username + ':' + password)),
      observe: 'response'})
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getAllRiderRides(userid) {
    return this.http.get(this.baseURL + this.rideserver + '/rider' + '?riderid=' + userid)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public requestRide(reqObj) {
    return this.http.post(this.baseURL + this.riderserver + '/addride', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public cancelRide(reqObj) {
    return this.http.post(this.baseURL + this.riderserver + '/cancelride', reqObj)
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getAllDriverRides(driverid) {
    return this.http.get(this.baseURL + this.rideserver + '/driver' + '?driverid=' + driverid)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getOpenRides() {
    return this.http.get(this.baseURL + this.rideserver + '/openrides')
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public updateRide(reqObj) {
    return this.http.post(this.baseURL + this.driverserver + '/updateride', reqObj)
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getAllRides() {
    return this.http.get(this.baseURL + this.rideserver + '/admin')
    .pipe(
      map(resp  => {
        return resp;
      }));
  }
}
