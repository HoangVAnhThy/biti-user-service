import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { UserProfileService } from '../service/user-profile.service';
import { Cart } from '../model/Cart';
import { Product } from '../model/Product';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeVi, 'vi');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  countProduct: number = 0;
  carts: Cart[] = [];
  total: number = 0;
  payload:any;
  displayName = "Tài khoản";



  constructor(private userProfileService: UserProfileService,
    private globalService: GlobalService){

  }

  deleteCart(productId:any){
    this.userProfileService.deleteCart(productId).subscribe(()=>{
        this.carts.forEach((cart:any)=>{
          if(cart.product.productId == productId){
            const index = this.carts.indexOf(cart);
            this.carts.splice(index, 1);
            this.countProduct--;
            this.total = this.total - (cart.quantity * cart.product.price);
          }
        })
    });
    
  }


  renderCart(){
        this.carts = [];
        this.total = 0;
        this.countProduct = 0;
      this.userProfileService.getCart().subscribe((data:any)=>{
        data.data.carts.map((item:any) => {
          let product:Product;
          let cart: Cart;
          product = {
            productId: item.product.id,
            price: item.product.price,
            thumbnail: item.product.thumbnail,
            productName: item.product.name
          }
          cart = {
            product: product,
            quantity: item.quantity
          }
          this.carts = [
            ...this.carts,
            cart
          ]
          this.total = this.total + (item.product.price* item.quantity);
          this.countProduct++;
      })
     })
  }

  ngOnInit(): void {
    if(this.globalService.getCookie("token")!=null){
      this.renderCart();
      this.payload = this.globalService.parseJwt(this.globalService.getCookie("token"));
      this.displayName = this.payload.sub;
    }
 }


}
