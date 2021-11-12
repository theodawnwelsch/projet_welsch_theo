import { Produit } from "../models/produit";

export class AddProduct {
    static readonly type = '[Produit] Add';

    constructor(public payload: Produit) {}
}
