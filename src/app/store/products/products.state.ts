import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { LogErrorEntry } from "../errors-logging/errors-logging.actions";
import { addSelectedProduct, addSelectedVariant, clearSelectedProduct, clearSelectedVariant, GetProductList, ProductsLogOut } from "./products.actions";

export interface ProductStateModel {
    selectedProduct: any | null;
    selectedVariant: any | null;
    productsList: any | null;
}

export const initStateModel: ProductStateModel = {
    selectedProduct: null,
    selectedVariant: null,
    productsList: null,
};
@State({
    name: 'product',
    defaults: initStateModel,
})
@Injectable()
export class ProductState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }
    @Selector()
    static getProductList(state: ProductStateModel) {
        return state.productsList;
    }
    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }
    @Selector()
    static getSelectedVariant(state: ProductStateModel) {
        return state.selectedVariant;
    }
    @Action(GetProductList)
    async getProductList({ patchState }: StateContext<ProductStateModel>) {
        try {
            let response = await this.medusaClient.products.list();
            if (response?.products != null && response.response?.status === 200) {
                patchState({
                    productsList: response?.products,
                });
            }
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(addSelectedProduct)
    addProductToState(ctx: StateContext<ProductStateModel>, { payload }: addSelectedProduct) {
        // console.log('selectedProduct', payload);
        ctx.patchState({
            selectedProduct: payload,
        });
    }
    @Action(clearSelectedProduct)
    clearProductFromState(ctx: StateContext<ProductStateModel>): void {
        // console.log('clear selectedProduct');
        ctx.patchState({
            selectedProduct: null,
        });
    }
    @Action(addSelectedVariant)
    addVariantToState(ctx: StateContext<ProductStateModel>, { payload }: addSelectedVariant) {
        // console.log(payload);
        ctx.patchState({
            selectedVariant: payload,
        });
    }
    @Action(clearSelectedVariant)
    clearVariantFromState(ctx: StateContext<ProductStateModel>) {
        // console.log('selectedVariant: null');
        ctx.patchState({
            selectedVariant: null,
        });
    }
    @Action(ProductsLogOut)
    productsLogOut(ctx: StateContext<ProductStateModel>) {
        ctx.patchState({
            selectedProduct: null,
            selectedVariant: null,
            productsList: null,
        });
    }
}
