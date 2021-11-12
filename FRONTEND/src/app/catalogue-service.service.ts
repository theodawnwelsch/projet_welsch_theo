import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from './models/produit';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CatalogueServiceService {

  constructor(private httpClient: HttpClient) 
  { }

  public getCatalogue():
  Observable<Array<Produit>> {
    return this.httpClient.get<Array<Produit>> (environment.baseUrl);
  }
}
