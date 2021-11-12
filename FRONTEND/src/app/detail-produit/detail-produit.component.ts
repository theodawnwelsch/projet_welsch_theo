import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { ActivatedRoute } from '@angular/router';
import { CatalogueServiceService } from '../catalogue-service.service';
import { Store } from '@ngxs/store';
import { AddProduct } from '../actions/add-product';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  constructor(private myCatalogueService: CatalogueServiceService, private route:ActivatedRoute, private store:Store) { }

  id : number = 0;
  catalogue$!: Observable<Produit[]>

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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
