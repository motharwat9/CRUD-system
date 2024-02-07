import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsTaskComponent } from './components/details-task/details-task.component';
import { MaterialModule } from 'projects/admin/src/app/material/material.module';


@NgModule({
  declarations: [
    ListTasksComponent,
    DetailsTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NgxPaginationModule,
    MaterialModule
  ]
})
export class TasksModule { }
