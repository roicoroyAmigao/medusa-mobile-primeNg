import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { UtilityService } from "src/app/shared/services/utility.service";
import { environment } from "src/environments/environment";
import { LogErrorEntry } from "../errors-logging/errors-logging.actions";
import { MedusaStateModel } from "../medusa/medusa.state";
import { addProduct, addVariant, clearProduct, clearVariant, GetProductList } from "./products.actions";

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
    @Action(addProduct)
    addProductToState(ctx: StateContext<ProductStateModel>, { payload }: addProduct) {
        console.log('selectedProduct', payload);
        ctx.patchState({
            selectedProduct: payload,
        });
    }
    @Action(clearProduct)
    clearProductFromState(ctx: StateContext<ProductStateModel>): void {
        console.log('clear selectedProduct');
        ctx.patchState({
            selectedProduct: null,
        });
    }
    @Action(addVariant)
    addVariantToState(ctx: StateContext<ProductStateModel>, { payload }: addVariant) {
        console.log(payload);
        ctx.patchState({
            selectedVariant: payload,
        });
    }
    @Action(clearVariant)
    clearVariantFromState(ctx: StateContext<ProductStateModel>): void {
        console.log('selectedVariant: null');
        ctx.patchState({
            selectedVariant: null,
        });
    }
}
