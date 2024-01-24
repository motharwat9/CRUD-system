import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;

  constructor(
      private fb:FormBuilder ,
      private authService:AuthService, 
      private router:Router,
      private toster:ToastrService
      ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm =this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      role:['admin']
    })
  }
  submit(){
    let model=this.loginForm.value
    this.authService.loginUser(model).subscribe((res:any)=>{
      localStorage.setItem('token',res.token)
      this.toster.success("success","Login Success");
      this.router.navigate(['tasks'])
    })
  }
}
