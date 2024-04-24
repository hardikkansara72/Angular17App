import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginSingupService {

  constructor(private http:HttpClient, private apiService:ApiService) { }
  
  authLogin(user_name:any, password:any):Observable<any>{
    return this.apiService.get('/user?email='+user_name+'&password='+password)
  }
  
  userRegister(user_dto:any):Observable<any>{
    return this.apiService.post('/user',user_dto)
  }
  
  adminLogin(user_name:any, password:any):Observable<any>{
    return this.apiService.get('/user?email='+user_name+'&password='+password+'&role=admin')
  }
}
