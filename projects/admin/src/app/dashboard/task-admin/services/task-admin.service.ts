import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment.development';
import { FilterTasks } from '../../../interfaces/filter-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskAdminService {

  constructor(
    private http:HttpClient
    ) {}

  getAllTasks(filter:FilterTasks){
    let params = new HttpParams()
    // params= params.append('page',filter['page'])
    // params= params.append('limit',filter['limit'])
    // params= params.append('keyword',filter['keyword'])
    Object.entries(filter).forEach(([key,value]:any)=>{
      if(value)
        params = params.append(key , value)
    })
    return this.http.get(`${environment.APIURL}/tasks/all-tasks`,{params})
  }
  createTask(model:any){
    return this.http.post(`${environment.APIURL}/tasks/add-task`,model)
  }
  
  deleteTask(id:string){
    return this.http.delete(`${environment.APIURL}/tasks/delete-task/${id}`)
  }
  updateTask(model:any,id:any){
    return this.http.put(`${environment.APIURL}/tasks/edit-task/${id}`,model)
  }
  getAllUsers(){
    return this.http.get(`${environment.APIURL}/auth/users`);
  }
}
