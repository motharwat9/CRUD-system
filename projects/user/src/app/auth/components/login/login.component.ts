import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(
      private fb:FormBuilder ,
      private service:AuthService,
      private router:Router,
      private toster:ToastrService
      ) {}


  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm =this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      role:['user']
    })
  }
  submit(): void {
    let model=this.loginForm.value;
    this.service.loginUser(model).subscribe((res:any)=>{
      localStorage.setItem('token',res.token);
      this.toster.success("success","Login Success");
      this.router.navigate(['']);
    })
  }
}
