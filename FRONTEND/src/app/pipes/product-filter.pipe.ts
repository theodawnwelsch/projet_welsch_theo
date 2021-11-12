import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from '../models/produit';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: any, term?: any): any {
    if (term === undefined) return products;

    return products.filter(function(product: { model: string; brand:string}){
      return product.model.toLowerCase().includes(term.toLowerCase())
      || product.brand.toLowerCase().includes(term.toLowerCase())
    })
  }

}
