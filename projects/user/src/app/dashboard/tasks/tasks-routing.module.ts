import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { DetailsTaskComponent } from './components/details-task/details-task.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'AllTasks'},
  {path:'AllTasks',component:ListTasksComponent},
  { path: `Task/Details/:id`, component: DetailsTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
