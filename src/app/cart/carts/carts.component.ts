import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { carts } from '../../interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-carts',
  imports: [FormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  constructor(private toaster: ToastrService) { }
  cartProduct: carts[] = []
  continue: boolean = true
  product: carts[] = []
  emailValue: string = ""
  notAUser: boolean = false
  amount!: number
  totalPrice: number = 0
  empty: boolean = true
  router = inject(Router)
  Math: any;
  ngOnInit(): void {
    this.getProductAndAmount()
  }
  getProductAndAmount() {
    this.empty = true
    if (localStorage.getItem("carts")) {
      let amount = JSON.parse(localStorage.getItem("carts")!)
      this.cartProduct = amount.filter((el: any) => el.amount > 0)
      if (this.cartProduct.length > 0) this.empty = false
      this.total()
    }
  }
  total() {
    this.totalPrice = 0
    for (let i = 0; i < this.cartProduct.length; i++) {
      this.totalPrice += Math.round(this.cartProduct[i].prod.price * this.cartProduct[i].amount)
    }
  }
  handlecount(event: string, index: number,ev:Event) {
    if (event === "plus") {
      this.cartProduct[index].amount++
    }else if(event==="blur") {
      this.cartProduct[index].amount=+(ev.target as HTMLInputElement).value
      if(this.cartProduct[index].amount < 1){
        this.cartProduct.splice(index, 1)
      }
    }else {
      if (this.cartProduct[index].amount > 1) {
        this.cartProduct[index].amount--
      } else {
        this.cartProduct.splice(index, 1)
      }
    }
    if (this.cartProduct.length == 0) {
      this.empty = true
    } else {
      this.total()
    }
    localStorage.setItem("carts", JSON.stringify(this.cartProduct))
  }
  image() {
    this.router.navigate(["/products"])
  }
  clear() {
    this.cartProduct = []
    this.empty = true
    localStorage.setItem("carts", JSON.stringify(this.cartProduct))
  }
  takeEmail(event: Event) {
    this.emailValue = (event.target as HTMLInputElement).value
  }
  setOrder() {
    if (localStorage.getItem("user")) {
      let email = (JSON.parse(localStorage.getItem("user")!))[0].info.email
      if (email === this.emailValue) {
        this.toaster.success("valid email address")
        this.notAUser = false
        localStorage.setItem("cart", "true")
        this.router.navigate(["/payment"])
      } else {
        this.notAUser = true
        this.toaster.error("invalid email address")

      }
    } else {
      this.notAUser = true
      this.toaster.error("invalid email address")
    }
  }
  popup() {
    this.continue = !this.continue
  }
  register() {
    if (localStorage.getItem("user")) localStorage.removeItem("user")
    this.router.navigate(["/register"])
  }
}
