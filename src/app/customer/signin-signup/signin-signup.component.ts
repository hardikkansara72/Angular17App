import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSingupService } from '../../shared/services/login-singup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})


export class SigninSignupComponent {

  regForm:boolean = false;
  signUpForm!:FormGroup;
  signInForm!:FormGroup;
  signUpSubmitted = false;
  href:string = "";
  user_data!:any;
  user_dto!:User;
  user_reg_data:any;
  signInFormValue:any = {};
  forgotpassword:boolean = false;
  forgorPasswordForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginSingupService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.href = this.router.url
    if(this.href == "/sign-up"){
      this.regForm = true;
    }else if(this.href == "/sign-in"){
      this.regForm = false
    }
    
    this.signUpForm = this.formBuilder.group({
      name:['', Validators.required],
      mobNumber:['', Validators.required],
      age:['', Validators.required],
      dob:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      addLine1:['', Validators.required],
      addLine2:['',],
      city:['', Validators.required],
      state:['', Validators.required],
      zipCode:['', Validators.required],
      language:['', Validators.required],
      gender:['', Validators.required],
      uploadPhoto:['', ],
      agreetc:['', Validators.required],
      aboutYou:['', Validators.required],
      role:['', Validators.required],
    });
  }

  get rf(){
    return this.signUpForm.controls;
  }

  onSubmitRegistration(){
    this.signUpSubmitted = true;
    if(this.signUpForm.invalid){
      return;
    }
    this.user_reg_data = this.signUpForm.value;
    this.user_dto = {
      name:this.user_reg_data.name,
      mobNumber:this.user_reg_data.mobNumber,
      age:this.user_reg_data.age,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      password:this.user_reg_data.password,
      address:{
        id:1,
        addLine1:this.user_reg_data.addLine1,
        addLine2:this.user_reg_data.addLine2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipCode:this.user_reg_data.zipCode,
      },
      language:this.user_reg_data.language[0],
      gender:this.user_reg_data.gender,
      uploadPhoto:this.user_reg_data.uploadPhoto,
      agreetc:this.user_reg_data.agreetc,
      aboutYou:this.user_reg_data.aboutYou,
      role:this.user_reg_data.role
    },
    this.loginService.userRegister(this.user_dto).subscribe((data) => {
      alert("User Register Successfull!");
      this.router.navigateByUrl("/sign-in");
    });
  }

  onSubmitSignin(){
    this.loginService.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data=>{
      this.user_data = data;
      if(this.user_data.length == 1){
        if(this.user_data[0].role == "seller"){
          sessionStorage.setItem("user_session_ID", this.user_data[0].id);
          sessionStorage.setItem("role", this.user_data[0].role);
          this.router.navigateByUrl("/seller-dashboard");
        }
        else if(this.user_data[0].role == "buyer"){
          sessionStorage.setItem("user_session_ID", this.user_data[0].id);
          sessionStorage.setItem("role", this.user_data[0].role);
          this.router.navigateByUrl("/buyer-dashboard");
        }
        else{
          alert("Invalid login details!");
        }
      }else{
        alert("Invalid!");
      }
    },error=>{
      console.log(error)
    })
  }

  login(user:any, password:any){
    if (user=="Chandan" && password=="132"){
      sessionStorage.setItem("IsloggedIn", "true");
    }else{
      sessionStorage.setItem("IsloggedIn", "false");
    }
  }
}
