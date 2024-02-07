import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Task } from 'projects/user/src/app/interfaces/task';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.scss']
})
export class DetailsTaskComponent implements OnInit {

  taskId!: string ;
  task!: Task

  constructor(    
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private service:TaskService,
    private toster:ToastrService,
    private location:Location
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      this.taskId = param['id'];
      this.service.getTaskById(this.taskId).subscribe((res:any)=>{
        this.task = res.tasks;
      })
    })
  }
  completedTask(): void {
    let model={
      id:this.taskId
    };
    this.service.completeTask(model).subscribe(res=>{
      this.router.navigate(['/tasks']);
      this.toster.success('Task Complete Successfuly','success');
    })
  }
  goBack(): void {
  this.location.back();
  }
}
