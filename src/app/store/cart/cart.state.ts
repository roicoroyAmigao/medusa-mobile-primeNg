import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { UtilityService } from "src/app/shared/services/utility.service";
import { environment } from "src/environments/environment";
import { LogErrorEntry } from "../errors-logging/errors-logging.actions";
import { UserActions } from "../user/user.actions";
import { CartActions } from "./cart.actions";

export interface CartStateModel {
    cartId: string | any;
    cart: string | any;
    selectedRegion: string | any;
    selectedCountry: string | any;
}

export const initStateModel: CartStateModel = {
    cartId: null,
    cart: null,
    selectedRegion: null,
    selectedCountry: null,
};
@State({
    name: 'cart',
    defaults: initStateModel,
})
@Injectable()
export class CartState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }
    @Selector()
    static getCart(state: CartStateModel) {
        return state.cart;
    }
    @Selector()
    static getCartId(state: CartStateModel) {
        return state.cartId;
    }
    @Action(CartActions.GetMedusaCart)
    async getMedusaCart(ctx: StateContext<CartStateModel>, { cartId }: CartActions.GetMedusaCart) {
        try {
            let cart = await this.medusaClient.carts?.retrieve(cartId);
            this.store.dispatch(new UserActions.GetSession());
            ctx.patchState({
                cart: cart?.cart,
                cartId: cart?.cart.id,
            });
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
                console.log(err);
            }
        }
    }
    @Action(CartActions.CreateMedusaCart)
    async createMedusaCart(ctx: StateContext<CartStateModel>) {
        try {
            let cart = await this.medusaClient.carts.create();
            // this.store.dispatch(new UserActions.GetSession());
            ctx.patchState({
                cart: cart?.cart,
                cartId: cart?.cart.id,
            });
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
                console.log(err);
            }
        }
    }
    @Action(CartActions.CreateMedusaCartWithItems)
    async createMedusaCartWithItems(ctx: StateContext<CartStateModel>, { selectedVariant }: CartActions.CreateMedusaCartWithItems) {
        try {
            let cart = await this.medusaClient.carts.create();
            let cartWithItems = await this.medusaClient.carts.lineItems.create(cart.id, {
                variant_id: selectedVariant?.id,
                quantity: selectedVariant?.quantity,
            });
            // this.store.dispatch(new UserActions.GetSession());
            ctx.patchState({
                cart: cartWithItems?.cart,
                cartId: cartWithItems?.cart.id,
            });
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
                console.log(err);
            }
        }

    }
    @Action(CartActions.UpdateCart)
    async updateCart(ctx: StateContext<CartStateModel>, { cartId, payload }: CartActions.UpdateCart) {
        try {
            let cart = await this.medusaClient.carts.update(cartId, {
                billing_address: payload.billing_address != null ? payload.billing_address : null,
                customer_id: payload.customer_id != null ? payload.customer_id : null,
                shipping_address: payload.shipping_address != null ? payload.shipping_address : null,
            });
            ctx.patchState({
                cart: cart?.cart,
                cartId: cart?.cart.id,
            });
            this.store.dispatch(new UserActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CartActions.AddProductMedusaToCart)
    async addProductMedusaToCart(ctx: StateContext<CartStateModel>, { cartId, quantity, variantId }: CartActions.AddProductMedusaToCart) {
        try {
            let cart = await this.medusaClient.carts.lineItems.create(cartId, {
                variant_id: variantId,
                quantity: quantity
            });
            ctx.patchState({
                cart: cart?.cart,
                cartId: cart?.cart.id,
            });
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }

    }
    @Action(CartActions.DeleteProductMedusaFromCart)
    async deleteProductMedusaFromCart(ctx: StateContext<CartStateModel>, { cart_id, line_id }: CartActions.DeleteProductMedusaFromCart) {
        try {
            let cart = await this.medusaClient.carts.lineItems.delete(cart_id, line_id);
            // this.store.dispatch(new UserActions.GetSession());
            ctx.patchState({
                cart: cart?.cart,
                cartId: cart?.cart.id,
            });
        }
        catch (err: any) {
            if (err) {
                console.log(err);
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CartActions.CreateCartWithRegionId)
    async createCartWithRegionId(ctx: StateContext<CartStateModel>, { regionId }: CartActions.CreateCartWithRegionId) {
        try {
            let cart = await this.medusaClient.carts.create({
                region_id: regionId
            });
            // this.store.dispatch(new UserActions.GetSession());
            if (cart) {
                ctx.patchState({
                    cart: cart?.cart,
                    cartId: cart?.cart.id,
                });
            }
        }
        catch (err: any) {
            if (err) {
                console.log(err);
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CartActions.UpdateRegionCountryCart)
    async updateRegionCountryCart(ctx: StateContext<CartStateModel>, { cartId, payload }: CartActions.UpdateRegionCountryCart) {
        try {
            let cart = await this.medusaClient.carts.update(cartId, {
                region_id: payload.region_id != null ? payload.region_id : null,
                country_code: payload?.country_code
            });
            this.store.dispatch(new CartActions.UpdateSelectedCountry(payload?.country_code))
            this.store.dispatch(new CartActions.UpdateSelectedRegion(payload.region_id))
        }
        catch (err: any) {
            if (err.response) {
            }
        }
    }

    @Action(CartActions.UpdateSelectedRegion)
    async updateselectedRegion(ctx: StateContext<CartStateModel>, { selectedRegion }: CartActions.UpdateSelectedRegion) {
        // console.log(selectedRegion);
        try {
            ctx.patchState({
                selectedRegion: selectedRegion,
            });
        }
        catch (err: any) {
            if (err.response) {
            }
        }
    }
    @Action(CartActions.UpdateSelectedCountry)
    async updateSelectedCountry(ctx: StateContext<CartStateModel>, { selectedCountry }: CartActions.UpdateSelectedCountry) {
        // console.log(selectedCountry);
        try {
            ctx.patchState({
                selectedCountry: selectedCountry,
            });
        }
        catch (err: any) {
            if (err.response) {
            }
        }
    }
}
