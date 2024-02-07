import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskAdminRoutingModule } from './task-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MaterialModule } from '../../material/material.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddTaskComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    TaskAdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class TaskAdminModule { }
