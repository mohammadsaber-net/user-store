import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";
import { CartsComponent } from '../../cart/carts/carts.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FooterComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  active: boolean = false
  router = inject(Router)
  amount: number=0
    ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.active = true
    }
  }
  changeInAmount(){
    if(localStorage.getItem("carts")){
      this.amount = 0
    let items = JSON.parse(localStorage.getItem("carts")!)
    for (let i = 0; i < items.length; i++) {
      if (items[i].amount > 0) {
        this.amount += items[i].amount
      }
    }
    return this.amount
    }else{
      this.amount = 0
      return this.amount
    }
    
  }
  register(event:Event) {
    (event.target as HTMLAnchorElement).innerHTML="sign Up"
    localStorage.removeItem("user")
    this.router.navigate(["/register"])
  }
}
