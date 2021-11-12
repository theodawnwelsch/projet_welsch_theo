import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductState } from 'src/app/states/product-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Select(ProductState.getNbProduits) nb$: Observable<number>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
