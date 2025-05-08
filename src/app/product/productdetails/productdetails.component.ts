import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { products } from '../../interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  imports: [CurrencyPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {
  id!: any
  product: products[] = []
  constructor(private route: ActivatedRoute, private http: ProductService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
    this.getproduct()
  }
  getproduct() {
    this.http.getProduct(this.id).subscribe({
      next: (data) => {
        console.log(data)
        this.product[0] = data

      }
    })
  }
}
