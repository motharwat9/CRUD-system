import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../veiwModel/login';
import { environment } from 'projects/admin/src/environments/environment.development';
import { Observable } from 'rxjs';
import { LoginModel } from '../../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http:HttpClient,
  ) {}

  loginUser(model:Login) :Observable<LoginModel>{
    return this.http.post<LoginModel>(`${environment.APIURL}/auth/login`,model)
  }
}
