import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../interfaces/register';
import { environment } from 'projects/user/src/environments/environment.development';
import { Login } from '../../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
    ) { }

  createUser(model:Register){
    return this.http.post(`${environment.APIURL}/auth/createAccount`,model)
  }
  loginUser(model:Login){
    return this.http.post(`${environment.APIURL}/auth/login`,model)
  }
}
