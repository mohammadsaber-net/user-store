import { Component, inject,  } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import { carts } from '../../interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CashComponent } from '../cash/cash.component';
import { VisaComponent } from '../visa/visa.component';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule,CashComponent,VisaComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent  {
  constructor(private toaster: ToastrService) { }
  router = inject(Router)
  items:any
  chosePaymentWay:string=""
  show: carts[] = []
  clientInfo: any = []
  total: number = 0
  confirmed: boolean = false
  cartVisa(event:any){
    this.items =event
    let item=this.items[0]
      for (let x in item) {
        this.clientInfo.push({
          id: item[x].prod.id,
          title: item[x].prod.title,
          amount: item[x].amount
        })
      }
      this.clientInfo.push({ card: this.items[1] })
      let user: number = JSON.parse(localStorage.getItem("user")!)[0].userid
      this.clientInfo.push({user})
      localStorage.setItem("order", JSON.stringify(this.clientInfo))
      this.total = 0
    this.show = this.items[0]
    for (let x in this.items[0]) {
      this.total += Math.round(this.items[0][x].prod.price * this.items[0][x].amount)
    }
      this.confirmed = true
  }
  close() {
    this.confirmed = !this.confirmed
    this.toaster.success("order confirmed")
    localStorage.removeItem("carts")
    localStorage.removeItem("order")
    localStorage.removeItem("cart")
    this.router.navigate(["/products"])
  }
  
  payment(event:Event){
    this.chosePaymentWay =(event.target as HTMLInputElement).value
  }
  changeCss(radio:Event){
    let parent=(radio.target as HTMLInputElement).parentElement
  }

}
