import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product_url = "/products/"
  
  constructor(private httpClient:HttpClient, private apiService:ApiService) { }

  allProducts():Observable<any>{
    return this.apiService.get(this.product_url);
  }

  addNewProduct(product_dto:any){
    return this.apiService.post(this.product_url, product_dto);
  }

  singleProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }

  update_product(id:any, product_dto:any):Observable<any>{
    return this.apiService.put(this.product_url+id, product_dto);
  }

  delete_product(id:any):Observable<any>{
    return this.apiService.delete(this.product_url+id);
  }


}
