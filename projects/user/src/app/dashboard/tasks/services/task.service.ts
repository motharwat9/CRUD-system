import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterTask } from '../../../interfaces/filter-task';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http:HttpClient
    ) { }

    
  getAllTasks(userId: string, tasksParams: FilterTask) {
    let params = new HttpParams()
    Object.entries(tasksParams).forEach(([key,value]:any)=>{
      if(value)
      params=params.append(key,value)
    })
    return this.http.get(`${environment.APIURL}/tasks/user-tasks/${userId}`,{params})
  }
  completeTask(model: object) {
    return this.http.put(`${environment.APIURL}/tasks/complete`,model)
  }
  getTaskById(id: string) {
    return this.http.get(`${environment.APIURL}/tasks/task/${id}`)
  }
}
