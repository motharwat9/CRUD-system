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
      private toaster:ToastrService,
      private spinner: NgxSpinnerService) {}
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
    this.spinner.show()
    let model=this.loginForm.value
    this.authService.loginUser(model).subscribe((res:any)=>{
      this.spinner.hide()
      this.toaster.success('success','Login Success')
      this.router.navigate(['tasks'])
      console.log(res.token)
      localStorage.setItem('token',res.token)
    },error=>{
      this.toaster.error('error',error.error.message)
      this.spinner.hide()
    })
  }
}
