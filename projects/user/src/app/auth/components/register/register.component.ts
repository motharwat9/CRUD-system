import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../../interfaces/register';
import { passwordMatch } from '../../../validators/passwordMatch';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;

  constructor(
    private fb:FormBuilder, 
    private services:AuthService,
    private router:Router,
    private toster:ToastrService
    ) {}
    

  ngOnInit(): void {
    this.CreateForm();
  }
  get fc() {
    return this.registerForm.controls;
  }

  CreateForm(): void {
    this.registerForm = this.fb.group({
      username:['',[Validators.required, Validators.pattern('[a-zA-Z\\s]{3,}')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]],
      role:['user']
    },{validators:[passwordMatch]})
  }
  registerSubmit(): void {
    let model:Register = {
      username:this.registerForm.value['username'],
      email:this.registerForm.value['email'],
      password:this.registerForm.value['password'],
      role:this.registerForm.value['role'],
    }
    this.services.createUser(model).subscribe(res=>{
      this.toster.success('created Successfuly','success');
      this.router.navigate(['/login']);
    })
  }
}
