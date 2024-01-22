import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskAdminService } from '../../services/task-admin.service';
import * as moment from 'moment';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Tasks } from 'projects/admin/src/app/veiwModel/tasks';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  formTask!:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Tasks,
    private formBuilder: FormBuilder,
    private serves: TaskAdminService,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    public dialog:MatDialogRef<AddTaskComponent>
    ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.formTask=this.formBuilder.group({
      title:[this.data?.title || '',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId || '',[Validators.required]],
      image:[this.data?.image ||'',[Validators.required]],
      deadline:[this.data ? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '',[Validators.required]],
      description:[this.data?.description || '',[Validators.required]],
    })
  }
  get fc(){
    return this.formTask.controls
  }
  create(){
    this.spinner.show()
    let formData = this.prepereForm()
    this.serves.createTask(formData).subscribe(res=>{
      this.spinner.hide()
      this.toaster.success('Task Created Successfuly','success');
      this.dialog.close(true)
    },error=>{
      this.spinner.hide()
      this.toaster.error(error.error.message)
    })
  }
  update(){
    this.spinner.show()
    let formData = this.prepereForm()
    this.serves.updateTask(formData,this.data.id).subscribe(res=>{
      this.spinner.hide()
      this.toaster.success('Task Updated Successfuly','success');
      this.dialog.close(true)
    },error=>{
      this.spinner.hide()
      this.toaster.error(error.error.message)
    })
  }
  selectImage(event:any){
    this.formTask.get('image')?.setValue(event.target.files[0])
  }
  prepereForm(){
    let newDate = moment(this.formTask.value['deadline']).format('DD-MM-YYYY');
    let formData=new FormData()
    Object.entries(this.formTask.value).forEach(([key,value]:any)=>{
      if(key === 'deadline'){
        formData.append(key,newDate)
      }else {
        formData.append(key,value)
      }
    })
    return formData;
  }
}
