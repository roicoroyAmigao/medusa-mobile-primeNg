import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { HandleErrorService } from "src/app/shared/services/handle-error.service";
import { UtilityService } from "src/app/shared/services/utility.service";
import { environment } from "src/environments/environment";
import { addProduct, addVariant, clearProduct, clearVariant } from "./products.actions";

export interface ProductStateModel {
    selectedProduct: any | null;
    selectedVariant: any | null;
}

export const initStateModel: ProductStateModel = {
    selectedProduct: null,
    selectedVariant: null,
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
        private utility: UtilityService,
        private handleErrorService: HandleErrorService
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }
    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }

    @Action(addProduct)
    addProductToState(ctx: StateContext<ProductStateModel>, { payload }: addProduct) {
        console.log(payload);
        ctx.patchState({
            selectedProduct: payload,
        });
    }
    @Action(clearProduct)
    clearProductFromState(ctx: StateContext<ProductStateModel>): void {
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
        ctx.patchState({
            selectedVariant: null,
        });
    }
}
