import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { AddressesActions } from "../addresses/addresses.actions";
import { CustomerActions } from "../customer/customer.actions";
import { LogErrorEntry } from "../errors-logging/errors-logging.actions";
import { IRegisterAddress } from "../../../../projects/types/types.interfaces";
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
            this.store.dispatch(new CustomerActions.GetSession());
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
            this.store.dispatch(new CustomerActions.GetSession());
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
    @Action(CartActions.UpdateCartBillingAddress)
    async updateCartBillingAddress(ctx: StateContext<CartStateModel>, { cartId, address }: CartActions.UpdateCartBillingAddress) {
        try {
            const cart = await this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
            // console.log(cart);
            const editedCustomer: IRegisterAddress = {
                first_name: address?.first_name,
                last_name: address?.last_name,
                address_1: address?.address_1,
                address_2: address?.address_2,
                city: address?.city,
                country_code: address?.country_code,
                postal_code: address?.postal_code,
                phone: address?.phone,
            };
            const regionCode = await this.buildRegionCode(editedCustomer.country_code);
            let regionRes = await this.medusaClient.carts.update(cartId, {
                region_id: regionCode,
                country_code: editedCustomer?.country_code
            });
            let cartRes = await this.medusaClient.carts.update(cartId, {
                billing_address: editedCustomer,
                customer_id: cart.customer_id,
            });
            this.store.dispatch(new CartActions.GetMedusaCart(cartId));
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CartActions.UpdateCartShippingAddress)
    async updateCartShippingAddress(ctx: StateContext<CartStateModel>, { cartId, address }: CartActions.UpdateCartShippingAddress) {
        try {
            const cart = await this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
            const editedCustomer: IRegisterAddress = {
                first_name: address?.first_name,
                last_name: address?.last_name,
                address_1: address?.address_1,
                address_2: address?.address_2,
                city: address?.city,
                country_code: address?.country_code,
                postal_code: address?.postal_code,
                phone: address?.phone,
            };
            const regionCode = await this.buildRegionCode(editedCustomer.country_code);
            let regionRes = await this.medusaClient.carts.update(cartId, {
                region_id: regionCode,
                country_code: editedCustomer?.country_code
            });
            let cartRes = await this.medusaClient.carts.update(cartId, {
                shipping_address: editedCustomer,
                customer_id: cart.customer_id,
            });
            this.store.dispatch(new CartActions.GetMedusaCart(cartId));
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CartActions.UpdateCart)
    async updateCart(ctx: StateContext<CartStateModel>, { cartId, customer }: CartActions.UpdateCart) {
        try {
            const cart = await this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
            const editedCustomer: IRegisterAddress = {
                first_name: customer?.first_name,
                last_name: customer?.last_name,
                address_1: customer?.address_1,
                address_2: customer?.address_2,
                city: customer?.city,
                // region_code: customer.billing_address?.region_code,
                country_code: customer?.country_code,
                postal_code: customer?.postal_code,
                // region_id: cart2.region_id,
                phone: customer?.phone,
            };
            const regionCode = await this.buildRegionCode(editedCustomer.country_code);
            let regionRes = await this.medusaClient.carts.update(cartId, {
                region_id: regionCode,
            });
            let cartRes = await this.medusaClient.carts.update(cartId, {
                billing_address: editedCustomer,
                shipping_address: editedCustomer,
                customer_id: cart.customer_id,
            });
            this.store.dispatch(new CartActions.GetMedusaCart(cartId));
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    async buildRegionCode(country_code: string): Promise<string> {
        this.store.dispatch(new AddressesActions.GetRegionList());

        const regionList = await this.store.selectSnapshot<any>((state: any) => state.addresses?.regionList);
        const countries = regionList.map((region: any, i: any) => region.countries);
        const result = [].concat(...countries);
        const filtered: any = result.filter((region: any) => {
            return region.iso_2 === country_code;
        });
        return filtered[0]?.region_id;
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
    @Action(CartActions.CompleteCart)
    async completeCart(ctx: StateContext<CartStateModel>, { cartId }: CartActions.CompleteCart) {
        try {
            const cart = await this.medusaClient.carts.complete(cartId);
            if (cart) {
                console.log('complete cart', cart);
                // this.store.dispatch(new UserActions.GetSession());
            }
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CartActions.LogOut)
    logout(ctx: StateContext<CartStateModel>) {
        return ctx.setState({
            cartId: null,
            cart: null,
            selectedRegion: null,
            selectedCountry: null,
        });
    }
}
