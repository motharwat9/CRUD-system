import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment.development';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private allUsersSubject= new BehaviorSubject({})

  constructor(
    private http:HttpClient
    ) {}

  getAllUsers(filter?:any){
  let params = new HttpParams()
  if(filter){
    Object.entries(filter).forEach(([key,value]:any)=>{
      if(value)
      params = params.append(key,value)
    })
  }
  return this.http.get(`${environment.APIURL}/auth/users`,{params})  
  }
  loadAllUsers(filter?:any){
    this.getAllUsers(filter).subscribe((res:any)=>{
      this.allUsersSubject.next({
        data:res.users,
        totalItems:res.totalItems
      })
    })
  }
  getObservable(){
    return this.allUsersSubject.asObservable()
  }
  deleteUser(id: string){
    return this.http.delete(`${environment.APIURL}/auth/user/${id}`)
  }
  changeUserStatus(model: any){
    return this.http.put(`${environment.APIURL}/auth/user-status`,model)
  }
}
