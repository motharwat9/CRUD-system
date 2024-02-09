import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListTasksComponent } from './task-admin/components/list-tasks/list-tasks.component';



@NgModule({
  declarations: [
    LayoutComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class DashboardModule { }
