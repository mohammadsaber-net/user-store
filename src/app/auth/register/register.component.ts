
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private toaster: ToastrService,
  ) { }

  router = inject(Router)
  loginform: FormGroup = new FormGroup({
    user: new FormControl(null, [Validators.required
      , Validators.pattern(/^[a-zA-Z]{3,10}[1-9]{3,10}$/)
    ]),
    phone: new FormControl(null, [Validators.required
    ]),
    email: new FormControl(null,
      [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]{3,5}[1-9]{3,5}$/)
    ])
  }
  )
  check() {
    let userId = Math.round(this.loginform.value.phone / 55555)
    let user = [{ info: this.loginform.value, userid: userId }]
    localStorage.setItem("user", JSON.stringify(user))
    this.toaster.success("success sign up")
    this.router.navigate(["/products"])
  }
  login() {
    this.toaster.info("not avilable now due to database ")
  }
}
