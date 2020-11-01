import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseurl = environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(
    private http: HttpClient
  ) { }
  getAllUsers() {
    return this.http.get<User[]>(this.baseurl + '/users');
  }
  // getOrderData(id: number) {
  //   return this.http.get<User>(this.baseurl + '/orders/' + id);
  // }

  registerUser(user) {
    return this.http.post(this.baseurl + '/users', user, this.httpOptions);
  }
}
