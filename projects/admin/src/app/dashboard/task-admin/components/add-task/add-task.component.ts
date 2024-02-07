import { Users } from '../../../../interfaces/users';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskAdminService } from '../../services/task-admin.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'projects/admin/src/app/veiwModel/tasks';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';
import { VeiwUsers } from 'projects/admin/src/app/veiwModel/veiw-users';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  formTask!: FormGroup;
  formValues: any;
  users: VeiwUsers[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Task,
    private formBuilder: FormBuilder,
    private serves: TaskAdminService,
    private toaster:ToastrService,
    public dialog:MatDialogRef<AddTaskComponent>,
    public matDialog:MatDialog,
    private userService:UsersService
    ) {}

  ngOnInit(): void {
    this.createForm();
    this.storeSubject();
  }
  createForm() {
    this.formTask=this.formBuilder.group({
      title:[this.data?.title || '',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId || '',[Validators.required]],
      image:[this.data?.image ||'',[Validators.required]],
      deadline:[this.data ? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '',[Validators.required]],
      description:[this.data?.description || '',[Validators.required]],
    })
    this.formValues=this.formTask.value
  }
  get fc() {
    return this.formTask.controls
  }
  selectImage(event: any) {
    this.formTask.get('image')?.setValue(event.target.files[0])
  }
  prepereForm() {
    let newDate = moment(this.formTask.value['deadline']).format('DD-MM-YYYY');
    let formData=new FormData()
    Object.entries(this.formTask.value).forEach(([key,value]:any)=>{
      if (key === 'deadline') {
        formData.append(key,newDate);
      } else {
        formData.append(key,value);
      }
    });
    return formData;
  }
  createTask(): void {
    let formData = this.prepereForm()
    this.serves.createTask(formData).subscribe(res=>{
      this.toaster.success('Task Created Successfuly','success');
      this.dialog.close(true);
    })
  }
  update(): void {
    let formData = this.prepereForm()
    this.serves.updateTask(formData,this.data.id).subscribe(res=>{
      this.toaster.success('Task Updated Successfuly','success');
      this.dialog.close(true);
    })
  }
  close(): void {
    let hasChanges:boolean = false;
    Object.keys(this.formValues).forEach((key)=>{
      if(this.formValues[key] !== this.formTask.value[key])
        hasChanges =true;
    })
    if (hasChanges) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width:'500px',  
      });
        dialogRef.afterClosed().subscribe(result => {
        });
    }else {
      this.dialog.close();
    }
  }
  storeSubject() {
    this.userService.getObservable().subscribe((res:any)=>{
      this.users=this.prepereUsers(res.data);
    })
  }
  prepereUsers(users: Users[]) {
    let newUsers = users?.map((user)=>{
      return {
        name:user.username,
        id:user._id
      }
    })
    return newUsers
  }
}
