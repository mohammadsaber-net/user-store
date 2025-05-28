import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FooterComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  active: boolean = false
  router = inject(Router)
  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.active = true
    }
  }
  register(event:Event) {
    (event.target as HTMLAnchorElement).innerHTML="sign Up"
    localStorage.removeItem("user")
    this.router.navigate(["/register"])
  }
}
