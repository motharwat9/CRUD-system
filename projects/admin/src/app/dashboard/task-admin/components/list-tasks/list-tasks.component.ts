import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskAdminService } from '../../services/task-admin.service';
import { Tasks } from 'projects/admin/src/app/veiwModel/tasks';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit{
  tasks:Tasks[]=[]
  constructor(
      public dialog: MatDialog,
      private service:TaskAdminService,
      private spinner:NgxSpinnerService,
      private toaster:ToastrService
    ) {}

  ngOnInit(): void {
    this.loodAllTasks()
  }
  loodAllTasks(){
    this.spinner.show()
    return this.service.getAllTasks().subscribe(( res :any)=>{
      console.log(res.tasks)
      this.prepereTasks(res.tasks)
      this.spinner.hide()
    },error=>{
      this.toaster.error('error',error.error.message)
      this.spinner.hide()
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
    this.spinner.show()
    this.service.deleteTask(id).subscribe(res=>{
      this.loodAllTasks()
      this.spinner.hide()
      this.toaster.success('success','the task was deleted')
    },error=>{
      this.toaster.error('error',error.error.message)
      this.spinner.hide()
    })
  }
  updateTsak(item:any) {
    console.log(item)
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'750px',  
      data:item  
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.loodAllTasks()
      });
  }
}
