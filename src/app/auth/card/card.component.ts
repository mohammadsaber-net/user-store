import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { carts } from '../../interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  constructor(private toaster: ToastrService) { }
  router = inject(Router)
  show: carts[] = []
  clientInfo: any = []
  total: number = 0
  confirmed: boolean = false
  ngOnInit(): void {
    this.showProduct()
  }
  loginform: FormGroup = new FormGroup({
    bank: new FormControl(null, [
      Validators.required
    ]),
    credit: new FormControl(null, [
      Validators.required
    ]),
    numbers: new FormControl(null, [
      Validators.required
    ]),
  })
  showProduct() {
    this.total = 0
    this.show = JSON.parse(localStorage.getItem("carts")!)
    for (let x in this.show) {
      this.total += Math.round(this.show[x].prod.price * this.show[x].amount)
    }
  }
  confirm() {
    if (localStorage.getItem("carts")) {
      let items = JSON.parse(localStorage.getItem("carts")!)
      for (let x in items) {
        this.clientInfo.push({
          id: items[x].prod.id,
          title: items[x].prod.title,
          amount: items[x].amount
        })
      }
      this.clientInfo.push({ card: this.loginform.value })
      let user: number = JSON.parse(localStorage.getItem("user")!)[0].userid
      this.clientInfo.push({ user: user })
      localStorage.setItem("order", JSON.stringify(this.clientInfo))
      this.confirmed = true
    } else {
      this.toaster.error("cart are empty you need to buy something")
    }

  }
  close() {
    this.confirmed = !this.confirmed
    this.toaster.success("order confirmed")
    localStorage.removeItem("carts")
    localStorage.removeItem("order")
    this.router.navigate(["/products"])

  }
}
