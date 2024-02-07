import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/Guards/auth.guard';


const routes: Routes = [
  {path:'', component:LoginComponent,canActivate:[authGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
