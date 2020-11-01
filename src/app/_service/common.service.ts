import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseurl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
  getAllBranches() {
    return this.http.get<any[]>(this.baseurl + 'api/branch/list');  
  }

}
  