import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { LoginSingupService } from '../../shared/services/login-singup.service';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{

  signInFormValue:any = {}
  user_data:any = {}
  
  constructor(private router:Router, private apiService:ApiService, private loginSevice:LoginSingupService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let a:string =""
  }

  onSubmitSignIn(){
    this.loginSevice.adminLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data=>{
      this.user_data = data;
      if (this.user_data.length == 1) {
        sessionStorage.setItem("user_session_ID", this.user_data[0].id);
        sessionStorage.setItem("role", this.user_data[0].role);
        this.router.navigateByUrl('/admin-dashboard');
      }
      else{
        alert("Invalid Response!");
      }
    console.log(this.user_data);
    },error=>{
      console.log("onSubmitSignIn Error", error.error);
    });
  }
}
