import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material/material.module';
import { DashboardModule } from '../dashboard.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    NgxPaginationModule,
    MaterialModule,
    DashboardModule

  ]
})
export class ManageUsersModule { }
