import { Pipe, PipeTransform } from '@angular/core';
import { products } from './interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: products[], value: string): products[] {
    return products.filter(el => el.title.toLowerCase().includes(value.toLowerCase()));
  }

}
