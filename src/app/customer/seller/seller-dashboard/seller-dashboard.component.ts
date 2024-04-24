import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})


export class SellerDashboardComponent implements OnInit {

  order_dashboard_data:any;
  total_order:any;
  last_order_date:any;
  product_dashboard_data:any;
  total_products:number = 0;
  published_products:number = 0;
  inactive_products:number = 0;
  draft_products:number = 0;

  constructor(private router:Router, private customerService:CustomerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }

  sellerProductDashboard(){
    this.router.navigateByUrl("/seller/product");
  }

  sellerOrderDashboard(){
    alert("This option for only VIP candidate!");
  }

  sellerOrderDashboardData(){
    this.customerService.orderDashboardData().subscribe(data=>{
      this.order_dashboard_data = data;
      // console.log("order_dashboard_data", this.order_dashboard_data);
      this.total_order = Number(this.order_dashboard_data.length);
      this.last_order_date = this.order_dashboard_data[this.total_order - 1].dateTime;
      // console.log("Last Order date", this.last_order_date)
      // console.log("Last Order date", this.last_order_date)

    },error=>{
      console.log("sellerOrderDashboardData", error);
    })
  }

  sellerProductDashboardData(){
    this.customerService.productDashboardData().subscribe(data=>{
      this.product_dashboard_data = data;
      for(status in this.product_dashboard_data){
        // console.log("Status", this.product_dashboard_data[status].status);
        
        if(this.product_dashboard_data[status].status == "published"){
          ++this.published_products;
        }
        else if(this.product_dashboard_data[status].status == "inactive"){
          ++this.inactive_products;
        }
        else if(this.product_dashboard_data[status].status == "draft"){
          ++this.draft_products;
        }
        ++this.total_products;
      }
    },error=>{
      console.log("sellerProductDashboardData", error);
    })
  }

}
