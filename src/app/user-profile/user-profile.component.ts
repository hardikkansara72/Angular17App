import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../core/Model/object-model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  userProfileForm!:FormGroup;
  userProfile:boolean = false;
  user_id!:any;
  user_data:any;
  user_update_data!:any;
  user_dto!:User;
  user_profile_pic:any;
  user_language:any;
  user_role:any;

  constructor(private router:Router, private formBuilder:FormBuilder, private userServices:UserService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user_id = sessionStorage.getItem('user_session_ID');
    console.log("SessionID", this.user_id)
    this.userProfileForm = this.formBuilder.group({
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
    })
    this.editUserData(this.user_id);
  }

  get rf(){
    return this.userProfileForm.controls;
  }

  editUserData(user_id:any){
    this.userServices.getUserData(user_id).subscribe(data=>{
      this.user_data = data;
      this.user_profile_pic = this.user_data.uploadPhoto;
      this.user_language = this.user_data.language;
      this.user_role = this.user_data.role;
      this.userProfileForm.setValue({
          name:this.user_data.name,
          mobNumber:this.user_data.mobNumber,
          age:this.user_data.age,
          dob:this.user_data.dob,
          email:this.user_data.email,
          password:this.user_data.password,
          addLine1:this.user_data.address.addLine1,
          addLine2:this.user_data.address.addLine2,
          city:this.user_data.address.city,
          state:this.user_data.address.state,
          zipCode:this.user_data.address.zipCode,
          language:this.user_data.language[0],
          gender:this.user_data.gender,
          uploadPhoto:'',
          agreetc:this.user_data.agreetc,
          aboutYou:this.user_data.aboutYou,
          role:this.user_data.role
      })
    },error=>{
      console.log("editUserData",error)
    });
  }

  updateProfile(){
    this.userProfile = true;
    if(this.userProfileForm.invalid){
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_dto = {
      name:this.user_update_data.name,
      mobNumber:this.user_update_data.mobNumber,
      age:this.user_update_data.age,
      dob:this.user_update_data.dob,
      email:this.user_update_data.email,
      password:this.user_update_data.password,
      address:{
        id:1,
        addLine1:this.user_update_data.addLine1,
        addLine2:this.user_update_data.addLine2,
        city:this.user_update_data.city,
        state:this.user_update_data.state,
        zipCode:this.user_update_data.zipCode,
      },
      language:this.user_update_data.language[0],
      gender:this.user_update_data.gender,
      uploadPhoto:(this.user_update_data.uploadPhoto==""? this.user_update_data.updateProfile:this.user_update_data.userProfile),
      agreetc:this.user_update_data.agreetc,
      aboutYou:this.user_update_data.aboutYou,
      role:this.user_update_data.role
    }
    this.userServices.updateUserData(this.user_id, this.user_dto).subscribe(data=>{
      alert("Profile Update Successfully!! ")
      if(this.user_role == "admin"){
        this.router.navigateByUrl("/admin-dashboard");
      }
      else if(this.user_role == "seller"){
        this.router.navigateByUrl("/seller-dashboard");
      }
      else if(this.user_role == "buyer"){
        this.router.navigateByUrl("/buyer-dashboard");
      }
      else{
        alert("Something went wrong!");
      }
    },error=>{
      console.log("Error", error)
    })
  }

}
