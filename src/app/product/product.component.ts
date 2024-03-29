import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../core/Model/object-model';
import { animate } from '@angular/animations';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  all_product_data:any;
  addEditProductForm!:FormGroup;
  addEditProduct:boolean = false;
  popup_header!:string;
  add_product!:boolean;
  edit_product!:boolean;
  product_data:any;
  single_product_data:any;
  product_dto!:Product;
  edit_product_id:any;


  constructor(private router:Router, private productService:ProductService, private fb:FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProduct();

    this.addEditProductForm = this.fb.group({
      name:['', Validators.required],
      uploadPhoto:['', Validators.required],
      productDesc:['', Validators.required],
      mrp:['', Validators.required],
      dp:['', Validators.required],
      status:['', Validators.required]
    })
  }

  get rf(){
    console.log("Form Controls", this.addEditProductForm.controls)
    return this.addEditProductForm.controls;
  }

  getAllProduct(){
    this.productService.allProducts().subscribe(data=>{
      this.all_product_data = data;
    },error=>{
      console.log(error);
    })
  }

  addProductPopup(){
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Create Product";
    this.addEditProductForm.reset();
  }

  addNewProduct(){
    this.edit_product = true;
    if(this.addEditProductForm.invalid){
      alert("Error!! :-) \n\n"+JSON.stringify(this.addEditProductForm.value));
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto ={
      id:this.product_data.id,
      name:this.product_data.name,
      uploadPhoto:this.product_data.uploadPhoto,
      uploadDesc:this.product_data.uploadDesc,
      productDesc:this.product_data.productDesc,
      mrp:this.product_data.mrp,
      dp:this.product_data.dp,
      status:this.product_data.status
    }

    console.log(this.product_dto.uploadPhoto);

    this.productService.addNewProduct(this.product_dto).subscribe(data=>{
      this.getAllProduct();
    },error=>{
      console.log("", error)
    })
  }

  editProductPopup(id:any){
    this.edit_product = true;
    this.add_product = false;
    this.popup_header = "Update Product"
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe(data=>{
      this.single_product_data = data;
      console.log("", this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductForm.setValue({
        name:this.single_product_data.name,
        uploadPhoto:this.single_product_data.uploadPhoto,
        productDesc:this.single_product_data.productDesc,
        mrp:this.single_product_data.mrp,
        dp:this.single_product_data.dp,
        status:this.single_product_data.status
      })
    },error=>{
      console.log("",error);
    })
  }

  updateProduct(){
    this.edit_product=true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.product_data = this.addEditProductForm.value;
    console.log(this.product_data)
    this.product_dto ={
      id:this.product_data.id,
      name:this.product_data.name,
      uploadPhoto:this.product_data.uploadPhoto,
      uploadDesc:this.product_data.uploadDesc,
      productDesc:this.product_data.productDesc,
      mrp:this.product_data.mrp,
      dp:this.product_data.dp,
      status:this.product_data.status
    }
    this.productService.update_product(this.edit_product_id, this.product_dto).subscribe(data=>{
      alert("Product has been updated successfully!");
      this.getAllProduct();
    },error=>{
      console.log("",error);
    })
  }

  deleteProduct(id:any){
    let conf = confirm("Do you want to delte this product?"+ id);
    if(conf){
      this.productService.delete_product(id).subscribe(data=>{
        alert("Deleted Sucessfull!");
        this.getAllProduct();
      },error=>{
        console.log("",error);
      });
    }
    else{
      alert("You click Cancel!");
    }
  }
}
