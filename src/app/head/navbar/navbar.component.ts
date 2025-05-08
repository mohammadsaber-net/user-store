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
  register() {
    localStorage.removeItem("user")
    this.router.navigate(["/register"])
  }
  onActivate(event: any) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
