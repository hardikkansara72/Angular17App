import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_url = "/user/"

  constructor(private http:HttpClient, private apiService:ApiService) { }

  getUserData(user_id:any){
    return this.apiService.get(this.user_url+user_id);
  }

  updateUserData(user_id:any, user_dto:any){
    return this.apiService.put(this.user_url+user_id, user_dto);
  }
}
