import { Users } from '../../../../interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskAdminService } from '../../services/task-admin.service';
import { Task } from 'projects/admin/src/app/veiwModel/tasks';
import { ToastrService } from 'ngx-toastr';
import { FilterTasks } from 'projects/admin/src/app/interfaces/filter-tasks';
import * as moment from 'moment';
import { UsersService } from '../../../manage-users/services/users.service';
import { VeiwUsers } from 'projects/admin/src/app/veiwModel/veiw-users';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit{

  tasks:Task[]=[];
  page: number = 1;
  total!: number;
  timeOutId: any;
  selectedStatus: string = "In-Progress";
  users: VeiwUsers[] = [];
  filtes: FilterTasks = {
    page:this.page,
    limit:10,
    status:this.selectedStatus
  }

  constructor(
      public dialog: MatDialog,
      private service:TaskAdminService,
      private toaster:ToastrService,
      private userService:UsersService
    ) {}

  ngOnInit(): void {
    this.loodAllTasks();
    this.getUsers();
    this.storeSubject()
  }
  loodAllTasks() {
    return this.service.getAllTasks(this.filtes).subscribe(( res :any)=>{
      this.prepereTasks(res.tasks);
      this.total = res.totalItems;
    })
  }
  prepereTasks(tasks: Task[]){
    this.tasks=tasks.map((item: any)=>{
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
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    width:'750px',    
    disableClose:true,
  });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.loodAllTasks()
    });
  }
  deleteTask(id: string) {
    this.service.deleteTask(id).subscribe(res=>{
      this.loodAllTasks();
      this.toaster.success('success','the task was deleted');
    })
  }
  updateTsak(item: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'50rem',  
      data:item,
      disableClose:true
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.loodAllTasks()
      });
  }
  searchByTitle(event: any) {
    this.filtes['keyword'] = event.target.value;
    this.page = 1;
    this.filtes['page'] = 1;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.loodAllTasks();
    }, 2000);
  }
  serachByUser(event: any) {
    this.filtes['userId'] = event;
    this.page = 1;
    this.filtes['page'] = 1;
    this.loodAllTasks();
  }
  serachByStatus(event: any) {
    this.selectedStatus = event;
    this.filtes['status'] = event;
    this.page = 1;
    this.filtes['page'] = 1;
    this.loodAllTasks();
  }
  searchByDate(event: any , type: string) {
    this.page = 1;
    this.filtes['page'] = 1;
    let newDate=moment(event.value).format('DD-MM-YYYY');
    if (type === 'toDate' || type === 'fromDate')
    this.filtes[type]= newDate
    if (type == 'toDate' && this.filtes['toDate'] !== 'Invalid date') {
      this.loodAllTasks()
    }
    if (this.filtes['toDate'] === 'Invalid date' && this.filtes['fromDate'] === 'Invalid date')
    {
      this.filtes['toDate'] = '';
      this.filtes['fromDate'] = '';
      this.loodAllTasks()
    }
  }
  pageChanged(event: any) {
    this.page =event
    this.filtes['page'] = event
    this.loodAllTasks()
  }
  getUsers() {
    this.userService.loadAllUsers();
  }
  storeSubject() {
    this.userService.getObservable().subscribe((res: any)=>{
      this.users=this.prepereUsers(res.data);
      this.total = res.totalItems;
    })
  }
  prepereUsers(users: Users[]) {
    let newUsers = users?.map((user)=> {
      return {
        name:user.username,
        id:user._id
      }
    })
    return newUsers
  }
}