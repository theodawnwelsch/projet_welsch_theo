import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { RecapComponent } from './components/recap/recap.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { RouterModule, Routes } from '@angular/router';
import { LiensComponent } from './liens/liens.component';
import { ProductState } from './states/product-state';
import { PanierComponent } from './panier/panier.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';


const appRoutes: Routes = [
  {path:'catalogue', component: CatalogueComponent},
  {path:'components/form', component: FormComponent},
  {path: 'panier', component: PanierComponent},
  {path: 'details-produit/:id', component: DetailProduitComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    RecapComponent,
    CatalogueComponent,
    ProductFilterPipe,
    LiensComponent,
    PanierComponent,
    DetailProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([ProductState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
