import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { CatalogueServiceService } from '../catalogue-service.service';
import { Produit } from '../models/produit';
import { Store, Select } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AddProduct } from '../actions/add-product';
import { ProductState } from '../states/product-state';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private myCatalogueService: CatalogueServiceService, private store : Store) { }

  catalogue$!: Observable<Array<Produit>>;
  term!:string;

  ngOnInit(): void {
    this.term="";
    this.catalogue$ = this.myCatalogueService.getCatalogue();
  }

  addProduct(_id:number) {
    this.catalogue$.subscribe(data => {
      console.log(data[_id-1]);
      let id = data[_id-1].id;
      let brand = data[_id-1].brand;
      let model = data[_id-1].model;
      let prix = data[_id-1].prix;
      let produit = new Produit(id, brand, model, prix);

      console.log(produit);
      this.store.dispatch(new AddProduct(produit));
    }, error => {
      console.log(error);
    });
  }
}
