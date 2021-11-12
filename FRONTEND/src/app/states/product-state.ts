import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ProductStateModel } from "./product-state-model";
import { AddProduct } from "../actions/add-product";
import { DeleteProduct } from "../actions/delete-product";

@State<ProductStateModel>(
    {
        name: 'produit',
        defaults: {
            produits: [],
        }
    }
)
@Injectable()
export class ProductState {
    @Selector()
    static getNbProduits(state: ProductStateModel){
        return state.produits.length;
    }
    @Selector()
    static getListeContacts(state: ProductStateModel){
        return state.produits;
    }

    @Action(AddProduct)
    add(
        {getState, patchState}: StateContext<ProductStateModel>,
        { payload }: AddProduct
    ) {
        const state = getState();
        patchState({
            produits: [...state.produits, payload],
        });
    }

    @Action(DeleteProduct)
    delete(
        {getState, patchState}: StateContext<ProductStateModel>,
        { id }: DeleteProduct
    ) {
        const state = getState();
        patchState({
            produits: state.produits.filter(produit => produit.id != id)
        })
    };
}
