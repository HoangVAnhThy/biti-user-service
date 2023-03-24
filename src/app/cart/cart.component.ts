import { Component, OnInit, ElementRef } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Cart } from '../model/Cart';
import { UserProfileService } from '../service/user-profile.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  inputQuantity: any;
  carts: Cart[] = [];
  totalOrderPrice: number = 0;
  totalOrderPriceString: string = '0đ';; //For view
  countProduct: number = 0;
  constructor(private globalService:GlobalService,
    private userProfileService:UserProfileService,
    private elementRef:ElementRef){
  }

  increaseCount(event:any,price:any,productId:any) {
     this.inputQuantity = (event.target as Element).previousSibling;
      let quanity = parseInt(this.inputQuantity.value, 10);
      quanity = isNaN(quanity) ? 0 : quanity;
      quanity++;
      this.inputQuantity.value = quanity;
      //Set cart quantity for binding model
      this.carts.forEach((item:any)=>{
      if(item.product.productId == productId){
        item.quantity = quanity;
      }
    })
      
      // Handle Total Each Item
      let totalPriceElement: any;
      let totalPriceValue = price * quanity;
      totalPriceElement = (event.target as Element).parentNode?.nextSibling;
      totalPriceElement.textContent = this.globalService.addDotBetweenNumber(totalPriceValue) +'đ';

      //Handle Total Order Price
      if(event.target.parentNode.parentNode.firstChild.firstChild.checked == true){
        this.totalOrderPrice = this.totalOrderPrice + price;
        this.countProduct = this.countProduct + 1;
      }
      this.totalOrderPriceString = this.globalService.addDotBetweenNumber(this.totalOrderPrice) +'đ';
  }

  decreaseCount(event:any,price:any,productId:any) {
    this.inputQuantity = (event.target as Element).nextSibling;
    let quanity = parseInt(this.inputQuantity.value, 10);
    if (quanity > 1) {
      quanity = isNaN(quanity) ? 0 : quanity;
      quanity--;
      this.inputQuantity.value = quanity;
      //Set cart quantity for binding model
      this.carts.forEach((item:any)=>{
        if(item.product.productId == productId){
          item.quantity = quanity;
        }
      })
      //Handle Total Order Price
      if(event.target.parentNode.parentNode.firstChild.firstChild.checked == true){
        this.totalOrderPrice = this.totalOrderPrice - price;
        this.countProduct = this.countProduct - 1;
      }
    }
     // Handle Total Each Item
     let totalPriceElement: any;
     let totalPriceValue = price * quanity;
     totalPriceElement = (event.target as Element).parentNode?.nextSibling;
     totalPriceElement.textContent = this.globalService.addDotBetweenNumber(totalPriceValue) +'đ';

     this.totalOrderPriceString = this.globalService.addDotBetweenNumber(this.totalOrderPrice) +'đ';
  }


  handleCheckBoxAll(event:any){
    let listCheckBox = this.elementRef.nativeElement.querySelectorAll('.my-cart__item-checkbox');
    if(event.target.checked == true){
      listCheckBox.forEach((item:any) => {
        if(item.checked !=true){
          item.click();
        }
      });
    }
    else{
      listCheckBox.forEach((item:any) => {
        if(item.checked ==true){
          item.click();
        }
      });
    }
  }

  handleCheckBoxItem(event:any,price:any,quantity:any){
    // Handle Check Box All
    let listCheckBox = this.elementRef.nativeElement.querySelectorAll('.my-cart__item-checkbox');
    let checkBoxAll = this.elementRef.nativeElement.querySelector('.my-cart__heading-control-item-checkbox-all')
    let flag = 0;
    listCheckBox.forEach((item:any) => {
      if(item.checked == true){
        flag++;
      }
    });
    if(flag == listCheckBox.length){
      checkBoxAll.checked = true;
    }
    else{
      checkBoxAll.checked = false;
    }
    // Handle Get price
    let totalValue = price * quantity;
    if(event.target.checked == true){
      this.totalOrderPrice = this.totalOrderPrice + totalValue;
      this.countProduct = this.countProduct + quantity;
    }
    else{
      this.totalOrderPrice = this.totalOrderPrice - totalValue;
      this.countProduct = this.countProduct - quantity;
    }
    this.totalOrderPriceString = this.globalService.addDotBetweenNumber(this.totalOrderPrice) + 'đ';
  }


  renderCart(){
    this.carts = [];
    this.totalOrderPrice = 0;
    this.userProfileService.getCart().subscribe((data:any)=>{
      data.data.carts.map((item:any) => {
        let product:Product;
        let cart: Cart;
        product = {
          productId: item.product.id,
          price: item.product.price,
          thumbnail: item.product.thumbnail,
          productName: item.product.name,
          priceString: this.globalService.addDotBetweenNumber(item.product.price) +'đ'
        }
        let totalPrice = item.quantity * item.product.price;
        cart = {
          product: product,
          quantity: item.quantity,
          totalPrice: totalPrice,
          totalPriceString: this.globalService.addDotBetweenNumber(totalPrice) + 'đ'
        }
        this.carts = [
          ...this.carts,
          cart
        ]
    })
   })


  }

  ngOnInit(): void {
    if(this.globalService.getCookie("token")!=null){
      this.renderCart();
    }
  }
}
