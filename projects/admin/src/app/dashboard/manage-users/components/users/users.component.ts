import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from 'projects/admin/src/app/interfaces/users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  users: Users[] = [];
  page: number = 1;
  total!: number;
  userName: string = '';
  timeID: any;


  constructor(
    private service:UsersService,
    private toster:ToastrService,
    ) {}

  ngOnInit(): void {
    this.getUsers();
    this.storeSubject();
  }

  getUsers(): void {
    let filter = {
      page:this.page,
      limit:8,
      name:this.userName
    };
    this.service.loadAllUsers(filter);
  }
  storeSubject(): void {
    this.service.getObservable().subscribe((res:any)=>{
      this.users=res.data;
      this.total = res.totalItems;
    });
  }
  pageChanged(event: any) {
    this.page = event;
    this.getUsers();
  }
  searchByTitle(event: any){
    this.userName = event.target.value;
    this.page = 1;
    clearTimeout(this.timeID);
    this.timeID = setTimeout(()=>{
      this.getUsers()
    },2000)
  }

  deleteUser(user: Users,index: number){
    if (this.users[index].assignedTasks > 0) {
      this.toster.error('this user assignedTasks','error');
      return;
    } else {
      this.service.deleteUser(user._id).subscribe(res=>{
        this.toster.success('success' , 'Deleted Successfuly');
        this.getUsers();
      })
    }
  }
  changeStatus(user: Users,index: number){
    let model = {
      id:user._id,
      status:user.status
    };
    if (this.users[index].assignedTasks > 0) {
      this.toster.error('this user assignedTasks','error');
      return;
    } else {
      this.service.changeUserStatus(model).subscribe(res=>{
        this.getUsers();
      })
    }
  }
}
