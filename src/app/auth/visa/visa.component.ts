import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideToastr, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visa',
  imports: [ReactiveFormsModule],
  templateUrl: './visa.component.html',
  styleUrl: './visa.component.css'
})
export class VisaComponent {
  toaster=inject(ToastrService)
  @Output() cartContent:EventEmitter<any>=new EventEmitter
  loginform: FormGroup = new FormGroup({
    bank: new FormControl(null, [
      Validators.required
    ]),
    credit: new FormControl(null, [
      Validators.required,Validators.pattern(/^[1-9]{14}$/)
    ]),
    numbers: new FormControl(null, [
      Validators.required,Validators.pattern(/^[1-9]{3}$/)
    ]),
  })
  confirm() {
    localStorage.getItem("carts")?this.cartContent.emit([JSON.parse(localStorage.getItem("carts")!),this.loginform.value]):this.toaster.error("cart are empty you need to buy something")

    }
}
