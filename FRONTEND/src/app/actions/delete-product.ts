import { Produit } from "../models/produit";

export class DeleteProduct {
    static readonly type = '[Produit] Delete';
    
    constructor(public id: number) {}
}
