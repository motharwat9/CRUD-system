import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskAdminService } from '../../services/task-admin.service';
import { Tasks } from 'projects/admin/src/app/veiwModel/tasks';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit{
  tasks:Tasks[]=[]
  page:number = 1
  total!:number
  filtes:any ={
    page:this.page,
    limit:10
  }

  constructor(
      public dialog: MatDialog,
      private service:TaskAdminService,
      private toaster:ToastrService
    ) {}

  ngOnInit(): void {
    this.loodAllTasks()
  }

  loodAllTasks(){
    return this.service.getAllTasks(this.filtes).subscribe(( res :any)=>{
      console.log(res)
      this.prepereTasks(res.tasks)
      this.total=res.totalItems
    })
  }
  prepereTasks(tasks:any){
    this.tasks=tasks.map((item:any)=>{
      return{
        id:item._id,
        title:item.title,
        username:item.userId.username,
        deadline:item.deadline,
        image:item.image,
        status:item.status,
        userId:item.userId._id,
        description:item.description
      }
    })
    this.tasks.reverse()
    console.log(this.tasks)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    width:'750px',    
  });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.loodAllTasks()
    });
  }
  deleteTask(id:string){
    this.service.deleteTask(id).subscribe(res=>{
      this.loodAllTasks()
      this.toaster.success('success','the task was deleted')
    })
  }
  updateTsak(item:any) {
    console.log(item)
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'50rem',  
      data:item  
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.loodAllTasks()
      });
  }
  pageChanged(event:any){
    this.page =event
    this.filtes['page'] = event
    this.loodAllTasks()
  }
}