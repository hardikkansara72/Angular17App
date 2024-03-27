import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';

declare var $:any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  all_user_data:any;
  single_user_data:any;
  AddEditUserForm!:FormGroup;
  user_dto!:User;
  user_registration_data:any;
  edit_user_id:any;
  upload_file_name!:string;
  addEditUser:boolean = false; // Perform Validation or Crud Operation
  add_user:boolean = false;
  edit_user:boolean = false;
  popup_header!:string;
  signInFormValue:any = {};

  constructor (private formBuilder:FormBuilder, private router:Router, private adminService:AdminService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllUser();
    this.AddEditUserForm = this.formBuilder.group({
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
  }

  getAllUser(){
    this.adminService.allUser().subscribe(data=>{
      this.all_user_data = data;
    },error=>{
      console.log("getAllUser", error);
    });
  }

  get rf(){
    return this.AddEditUserForm.controls;
  }

  addUserPopup(){
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.AddEditUserForm.reset();
  }

  addUser(){
    this.addEditUser = true;
    if(this.AddEditUserForm.invalid){
      alert("Error!! :-) \n\n"+JSON.stringify(this.AddEditUserForm.value));
      return;
    }
    this.user_registration_data = this.AddEditUserForm.value;
    this.user_dto = {
      name:this.user_registration_data.name,
      mobNumber:this.user_registration_data.mobNumber,
      age:this.user_registration_data.age,
      dob:this.user_registration_data.dob,
      email:this.user_registration_data.email,
      password:this.user_registration_data.password,
      address:{
        id:1,
        addLine1:this.user_registration_data.addLine1,
        addLine2:this.user_registration_data.addLine2,
        city:this.user_registration_data.city,
        state:this.user_registration_data.state,
        zipCode:this.user_registration_data.zipCode,
      },
      language:this.user_registration_data.language[0],
      gender:this.user_registration_data.gender,
      uploadPhoto:this.user_registration_data.uploadPhoto,
      agreetc:this.user_registration_data.agreetc,
      aboutYou:this.user_registration_data.aboutYou,
      role:this.user_registration_data.role
    },
    this.adminService.addUser(this.user_dto).subscribe(data=>{
      this.AddEditUserForm.reset();
      this.getAllUser();
      $("#addEditUserModal").modal('toggle');
    }, error=>{
      console.log("addUser",error);
    })
  }

  editUserPopup(user_id:any){
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.adminService.singleUser(user_id).subscribe(data=>
      {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.uploadPhoto;
        this.AddEditUserForm.setValue({
          name:this.single_user_data.name,
          mobNumber:this.single_user_data.mobNumber,
          age:this.single_user_data.age,
          dob:this.single_user_data.dob,
          email:this.single_user_data.email,
          password:this.single_user_data.password,
          addLine1:this.single_user_data.address.addLine1,
          addLine2:this.single_user_data.address.addLine2,
          city:this.single_user_data.address.city,
          state:this.single_user_data.address.state,
          zipCode:this.single_user_data.address.zipCode,
          language:this.single_user_data.language[0],
          gender:this.single_user_data.gender,
          uploadPhoto:'',
          agreetc:this.single_user_data.agreetc,
          aboutYou:this.single_user_data.aboutYou,
          role:this.single_user_data.role
        })
      },error=>{
        console.log("editUserPopup",error)
      })
  }

  updateUser(){
    if(this.AddEditUserForm.invalid){
      console.log("Update");
      alert("Error!! :-) \n\n"+JSON.stringify(this.AddEditUserForm.value));
      return;
    }
    this.user_registration_data = this.AddEditUserForm.value;
    this.user_dto = {
      name:this.user_registration_data.name,
      mobNumber:this.user_registration_data.mobNumber,
      age:this.user_registration_data.age,
      dob:this.user_registration_data.dob,
      email:this.user_registration_data.email,
      password:this.user_registration_data.password,
      address:{
        id:1,
        addLine1:this.user_registration_data.addLine1,
        addLine2:this.user_registration_data.addLine2,
        city:this.user_registration_data.city,
        state:this.user_registration_data.state,
        zipCode:this.user_registration_data.zipCode,
      },
      language:this.user_registration_data.language[0],
      gender:this.user_registration_data.gender,
      uploadPhoto:(this.user_registration_data.uploadPhoto==""? this.upload_file_name:this.user_registration_data.uploadPhoto),
      agreetc:this.user_registration_data.agreetc,
      aboutYou:this.user_registration_data.aboutYou,
      role:this.user_registration_data.role
    },
    this.adminService.editUser(this.edit_user_id, this.user_dto).subscribe(data=>{
      this.AddEditUserForm.reset();
      this.getAllUser();
      $("#addEditUserModal").modal('toggle');
    }, error=>{
      alert(error);
      console.log("updateUser",error);
    })
  }

  deleteUser(user_id:any){
    this.adminService.deleteUser(user_id).subscribe(data=>{
      this.getAllUser();

    },error=>{
      console.log("deleteUser", error);
    })
  }


}


