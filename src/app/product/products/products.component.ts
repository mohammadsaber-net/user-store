import { Component, OnInit } from '@angular/core';
import { products } from '../../interface';
import { ProductService } from '../product.service';
import { OneproductComponent } from '../oneproduct/oneproduct.component';
import { SearchPipe } from '../../search.pipe';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [OneproductComponent, SearchPipe, NgxSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private http: ProductService, private spinner: NgxSpinnerService) { }
  allProducts: products[] = []
  value: string = ""
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.spinner.show()
    this.http.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data

        this.spinner.hide()
      }

    })
  }
  getValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value
    console.log(this.value)
  }
}
