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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { RouterModule, Routes } from '@angular/router';
import { LiensComponent } from './liens/liens.component';
import { ProductState } from './states/product-state';
import { PanierComponent } from './panier/panier.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { LoginComponent } from './components/login/login.component';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { AuthorizationService } from './services/authorization.service';

const appRoutes: Routes = [
  {path:'catalogue', component: CatalogueComponent},
  {path:'components/form', component: FormComponent},
  {path: 'panier', component: PanierComponent},
  {path: 'details-produit/:id', component: DetailProduitComponent},
  {path: 'components/login', component: LoginComponent},
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
    DetailProduitComponent,
    LoginComponent
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
  providers: [
    AuthorizationService,

    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
