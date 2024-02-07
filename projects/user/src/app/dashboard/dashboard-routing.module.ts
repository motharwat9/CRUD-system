import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { loginSuccessGuard } from '../core/Guards/login-success.guard';

const routes: Routes = [
  {path:'',component:LayoutComponent,canActivateChild:[loginSuccessGuard],children:[
    {path:'',loadChildren:()=> import(`./tasks/tasks.module`).then(m => m.TasksModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
