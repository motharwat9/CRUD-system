import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTask } from '../../../interfaces/add-task';
import { environment } from 'projects/admin/src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskAdminService {

  constructor(private http:HttpClient) { }
  getAllTasks(){
    return this.http.get('https://crud-ybsz.onrender.com/tasks/all-tasks')
  }
  createTask(model:any){
    return this.http.post(`${environment.APIURL}/tasks/add-task`,model)
  }
  updateTask(model:any,id:any){
    return this.http.put(`${environment.APIURL}/tasks/edit-task/${id}`,model)
  }

  deleteTask(id:string){
    return this.http.delete(`${environment.APIURL}/tasks/delete-task/${id}`)
  }
}
