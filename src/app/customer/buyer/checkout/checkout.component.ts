import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order, Product, User } from '../../../core/Model/object-model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  single_product_id:any;
  user_id:any;
  individual_product!:Product;
  user_detail!:User;
  user_address:any;
  user_contact_no:any;
  order_dto!:Order;

  constructor(private customerService:CustomerService, private router:Router){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.customerService.current_product.subscribe(product=>this.single_product_id=product);
    this.user_id = sessionStorage.getItem("user_session_ID");
    this.productDetails(this.single_product_id);
    this.userAddress(this.user_id);

  }

  productDetails(product_id:any){
    this.customerService.individualProduct(product_id).subscribe(data=>{
      this.individual_product = data;
      console.log("individual_product :=", this.individual_product);

    },error=>{
      console.log("",error);
    })
  }

  userAddress(user_id:any){
    this.customerService.userDetail(user_id).subscribe(data=>{
      this.user_address = data.address;
      this.user_contact_no = data.mobNumber;
    },error=>{
      console.log("userAddress",error);
    })
  }

  placeOrder(){
    this.order_dto = {
      id : 0,
      userId: this.user_id,
      sellerId:2,
      product:{
        id:this.individual_product.id,
        name:this.individual_product.name,
        uploadPhoto:this.individual_product.uploadPhoto,
        productDesc:this.individual_product.productDesc,
        uploadDesc:this.individual_product.uploadDesc,
        mrp:this.individual_product.mrp,
        dp:this.individual_product.dp,
        status:this.individual_product.status
      },
      deliveryAddress:{
        id:0,
        addLine1:this.user_address.addLine1,
        addLine2:this.user_address.addLine2,
        city:this.user_address.city,
        state:this.user_address.state,
        zipCode:this.user_address.zipCode,
      },
      contact:this.user_contact_no,
      datetime: new Date().toLocaleDateString()
    }
    
    console.log("Placed Order Details", this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe(data=>{
      alert("Order Placed Successfully!");
      this.router.navigateByUrl("/buyer-dashboard");
    }, error=>{
      console.log("placeOrder",error);
    })
  }

}
