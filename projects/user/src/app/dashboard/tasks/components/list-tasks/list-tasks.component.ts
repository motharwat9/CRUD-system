import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FilterTask } from 'projects/user/src/app/interfaces/filter-task';
import { DataUser } from 'projects/user/src/app/interfaces/data-user';
import { Task } from 'projects/user/src/app/interfaces/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  page: number = 1;
  total!: number;
  selectedStatus: string = "In-Progress";
  dataUser!: DataUser;
  tasks: Task[] = [];

  constructor(
    private service :TaskService,
    private toster :ToastrService,
    ) {}

  ngOnInit(): void {
    this.getUserData()
    this.getAllTasks()
  }
  getUserData() {
    let token = JSON.stringify(localStorage.getItem('token'));
    this.dataUser = JSON.parse(window.atob(token.split('.')[1]));
  }
  getAllTasks() {
    let params :FilterTask = {
      page :this.page,
      limit :10,
      status :this.selectedStatus
    };
    this.service.getAllTasks(this.dataUser.userId,params).subscribe((res:any)=>{
      this.tasks = res.tasks;
      this.total = res.totalItems;
    },(error)=>{
      let tasks = this.tasks.filter(tasks=>{
        tasks.status == 'Complete'
      })
      if(tasks.length == 0){
        this.tasks = []
      }
    })
  }
  change(event: any) {
    this.page = event;
    this.getAllTasks();
  }
  completedTask(ele: any) {
    console.log(ele)
    let model = {
      id: ele._id
    };
    this.service.completeTask(model).subscribe(res=>{
      if(this.tasks.length == 1){
        window.location.reload()
        this.getAllTasks();
      }else{
        this.getAllTasks();
      }
      this.toster.success('Task Complete Successfuly','success');
    });
  }
  serachByStatus(event: any) {
    this.selectedStatus = event;
    this.page = 1;
    this.getAllTasks();
  }
}
