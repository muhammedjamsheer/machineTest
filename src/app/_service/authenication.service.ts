import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenicationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(authdata) {
    return this.http.post<any>(`${environment.apiUrl}oauth/token`, authdata)
      .pipe(map(user => {
        debugger;
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }else{
          return false;  
        }
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    }
}
