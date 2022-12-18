// import ProductsResource from "@medusajs/medusa-js/dist/resources/products";
// import { Order, Customer, Product } from "@medusajs/medusa"

export class GetProductList {
    public static readonly type = '[ProductsState] Get Product List';
}

export class addProduct {
    public static readonly type = '[ProductsState] Add Products';
    constructor(public readonly payload: any) { }
}
export class clearProduct {
    public static readonly type = '[ProductsState] Clear Products';
}
export class addVariant {
    public static readonly type = '[ProductsState] Add Variant';
    constructor(public readonly payload: any) { }
}
export class clearVariant {
    public static readonly type = '[ProductsState] Clear Variant';
}
