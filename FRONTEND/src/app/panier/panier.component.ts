import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteProduct } from '../actions/delete-product';
import { Produit } from '../models/produit';
import { ProductState } from '../states/product-state';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(ProductState.getListeContacts) liste$: Observable<Produit[]>;
  ngOnInit(): void {
  }

  deleteProduct(_id:number) {
    this.store.dispatch(new DeleteProduct(_id));
  }
}
