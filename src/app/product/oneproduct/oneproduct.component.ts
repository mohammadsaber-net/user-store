import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-oneproduct',
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './oneproduct.component.html',
  styleUrl: './oneproduct.component.css'
})
export class OneproductComponent {
  constructor(private http: ProductService) { }
  @Output() productcount: EventEmitter<any> = new EventEmitter()
  active: boolean = true
  items: any[] = []
  amount: number=0;
  @Input() item: any = []
  changeToAmount() {
    this.active = false
    this.amount++
  }
  changeToCart(num: any) {
    if (num < 1) {
      this.active = true
    }
  }
  handlecount(event: string) {
    if(!isNaN(this.amount)){
      if (event == "plus") {
        this.amount++
      } else if (event == "minus") {
        if (this.amount > 0) {
          this.amount--
        }
      }
      this.changeToCart(this.amount)
    }  
  }
 takeVal(event:Event){
  let value=+(event.target as HTMLInputElement).value
  if(!isNaN(value)){ 
  this.amount= value
  }
 }
  send(item: any) {
    if (localStorage.getItem("carts")) {
      this.items = JSON.parse(localStorage.getItem("carts")!)
      let count = this.items.filter(el => el.prod.id !== item.id)
      count.push({ amount: this.amount, prod: item })
      localStorage.setItem("carts", JSON.stringify(count))
    } else {
      this.items.push({ amount: this.amount, prod: item })
      localStorage.setItem("carts", JSON.stringify(this.items))
    }
  }
}
