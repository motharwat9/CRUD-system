import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../interfaces/login';
import { environment } from 'projects/admin/src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(model:Login) {
    return this.http.post(`${environment.APIURL}/auth/login`,model);
  }
}
