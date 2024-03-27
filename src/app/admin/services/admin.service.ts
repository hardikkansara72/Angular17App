import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // public user_url:string = "/user"
  // public product_url:string = "/product"
  // public order_url:string = "/order"
  public user_url = "/user/";
  public product_url = "/products";
  public order_url = "/orders";
  public all_user = "/user";

  constructor(private apiService:ApiService) { }

  userDashboardData(){
    return this.apiService.get(this.user_url);
  }
  productDashboardData(){
    return this.apiService.get(this.product_url);
  }
  orderDashboardData(){
    return this.apiService.get(this.order_url);
  }
  allUser():Observable<any>{
    return this.apiService.get('/user');
  }
  addUser(user_dto:any){
    return this.apiService.post('/user/', user_dto);
  }

  //Get data of Individual user;
  singleUser(user_id:any){
    return this.apiService.get('/user/'+user_id);
  }
  //Update data of Individual user
  editUser(user_id:any, user_dto:any):Observable<any>{
    return this.apiService.put('/user/'+user_id, user_dto);
  }
  //Delete user
  deleteUser(user_id:any){
    return this.apiService.delete(this.user_url+user_id);
  }
}
