import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { UtilityService } from "src/app/shared/services/utility.service";
import { environment } from "src/environments/environment";
import { MedusaActions } from "../medusa/medusa.actions";
import { UserActions } from "../user/user.actions";

export interface MedusaStateModel {
    cartId: string | any;
    cart: string | any;
    secretKey: any | null;
}

export const initMedusaStateModel: MedusaStateModel = {
    cartId: null,
    cart: null,
    secretKey: null,
};
@State({
    name: 'medusa',
    defaults: initMedusaStateModel,
})
@Injectable()
export class MedusaState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }
    @Selector()
    static getCart(state: MedusaStateModel) {
        return state.cart;
    }
    @Selector()
    static getCartId(state: MedusaStateModel) {
        return state.cartId;
    }

    // @Selector()
    // static getRegionList(state: MedusaStateModel) {
    //     return state.regionList;
    // }
    @Action(MedusaActions.GetMedusaCart)
    async getMedusaCart(ctx: StateContext<MedusaStateModel>, { cartId }: MedusaActions.GetMedusaCart) {

        if (cartId != null) {
            try {
                let cart = await this.medusaClient.carts?.retrieve(cartId);
                this.store.dispatch(new UserActions.GetSession());
                return ctx.patchState({
                    cart: cart?.cart,
                    cartId: cart?.cart.id,
                });

            }
            catch (err: any) {
                if (err) {
                    ctx.patchState({
                        cart: null,
                        cartId: null
                    });
                }
            }
        }
    }
    @Action(MedusaActions.AddaShippingAddress)
    async addaShippingAddress(ctx: StateContext<MedusaStateModel>, { payload }: MedusaActions.AddaShippingAddress) {
        // console.log(payload);
        try {
            let customer = await this.medusaClient.customers.addresses.addAddress({
                address: {
                    first_name: payload?.first_name,
                    last_name: payload?.last_name,
                    address_1: payload?.address_1,
                    city: payload?.city,
                    country_code: payload?.country_code,
                    postal_code: payload?.postal_code,
                    phone: payload?.phone,
                    address_2: payload?.address_2,
                    province: 'Georgia',
                    company: 'Wyman LLC',
                    metadata: {}
                }
            });
            this.store.dispatch(new UserActions.GetSession());
        }
        catch (err: any) {
            if (err) {
            }
        }
    }
    // Update a Shipping Address
    @Action(MedusaActions.UpdateaShippingAddress)
    async updateaShippingAddress(ctx: StateContext<MedusaStateModel>, { addressId, payload }: MedusaActions.UpdateaShippingAddress) {
        console.log(addressId, payload);


        try {
            let customer = await this.medusaClient.customers.addresses.updateAddress(addressId, {
                payload
            });
            // console.log(customer);
            this.store.dispatch(new UserActions.GetSession());

        }
        catch (err: any) {
            if (err) {
                ctx.patchState({
                });
            }
        }
    }
    @Action(MedusaActions.UpdateCustomerAddress)
    async updateCustomerAddress(ctx: StateContext<MedusaStateModel>, { addressId, payload }: MedusaActions.UpdateCustomerAddress) {
        try {
            let customer = await this.medusaClient.customers.addresses.updateAddress(addressId, {
                first_name: payload?.first_name,
                last_name: payload?.last_name,
                address_1: payload.address?.address_1,
                address_2: payload.address?.address_2,
                city: payload.address?.city,
                country_code: payload.address?.country,
                postal_code: payload.address?.postal_code,
                phone: payload.address?.phone,
            });
            this.store.dispatch(new UserActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                ctx.patchState({
                });
            }
        }
    }
    @Action(MedusaActions.UpdateCart)
    async updateCart(ctx: StateContext<MedusaStateModel>, { cartId, payload }: MedusaActions.UpdateCart) {
        try {
            let cart = await this.medusaClient.carts.update(cartId, {
                billing_address: payload.billing_address != null ? payload.billing_address : null,
                customer_id: payload.customer_id != null ? payload.customer_id : null,
                shipping_address: payload.shipping_address != null ? payload.shipping_address : null,
            });
            await this.store.dispatch(new MedusaActions.GetMedusaCart(cart.cart.id));
        }
        catch (err: any) {
            if (err) {
            }
        }
    }
    @Action(MedusaActions.SecretKey)
    async secretKey(ctx: StateContext<MedusaStateModel>, { secretKey }: MedusaActions.SecretKey) {
        // console.log(secretKey);
        try {
            ctx.patchState({
                secretKey: secretKey,
            });
        }
        catch (err: any) {
            if (err) {
                ctx.patchState({
                });
            }
        }
    }
    @Action(MedusaActions.UnSetSecretKey)
    async unSetSecretKey(ctx: StateContext<MedusaStateModel>) {

        try {
            return ctx.patchState({
                secretKey: null,
            });
        }
        catch (err: any) {
            if (err) {
                ctx.patchState({
                });
            }
        }
    }
    @Action(MedusaActions.AddProductMedusaToCart)
    async addProductMedusaToCart({ patchState }: StateContext<MedusaStateModel>, { cartId, quantity, variantId }: MedusaActions.AddProductMedusaToCart) {
        // console.log(variantId, quantity, cartId);
        let result = await this.medusaClient.carts.lineItems.create(cartId, {
            variant_id: variantId,
            quantity: quantity
        });
        if (result != null) {
            patchState({
                cart: result.cart
            });
        }
    }
    @Action(MedusaActions.DeleteProductMedusaFromCart)
    async deleteProductMedusaFromCart(ctx: StateContext<MedusaStateModel>, { cart_id, line_id }: MedusaActions.DeleteProductMedusaFromCart) {
        // console.log(cart_id, line_id);
        return this.medusaClient.carts.lineItems.delete(cart_id, line_id)
            .then((result: any) => {
                // console.log(result);
                ctx.patchState({
                    cart: result?.cart
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
    @Action(MedusaActions.CreateCartWithRegionId)
    async createCartWithRegionId(ctx: StateContext<MedusaStateModel>, { regionId }: MedusaActions.CreateCartWithRegionId) {
        try {
            let cart = await this.medusaClient.carts.create({
                region_id: regionId
            });
            this.store.dispatch(new UserActions.GetSession());
            if (cart) {
                ctx.patchState({
                    cart: cart?.cart,
                    cartId: cart?.cart.id,
                });
            }


        }
        catch (err: any) {
            if (err) {
                // console.log(err);
            }
        }
    }
    @Action(MedusaActions.CreateMedusaCart)
    createMedusaCart(ctx: StateContext<MedusaStateModel>) {
        return this.medusaClient.carts.create()
            .then((result: any) => {
                // console.log(result.cart?.id);
                ctx.patchState({
                    cartId: result.cart?.id,
                    cart: result?.cart,
                });
            }).catch((error: any) => {
                console.log(error);
            });
    }
    @Action(MedusaActions.CreateMedusaCartWithItems)
    createMedusaCartWithItems({ patchState }: StateContext<MedusaStateModel>, { selectedVariant }: MedusaActions.CreateMedusaCartWithItems) {
        // console.log(selectedVariant);
        return this.medusaClient.carts.create()
            .then((result: any) => {
                // console.log(result.cart.id);
                if (result.cart?.id != null) {
                    return this.medusaClient.carts.lineItems.create(result.cart.id, {
                        variant_id: selectedVariant?.id,
                        quantity: selectedVariant?.quantity,
                    }).then((result: any) => {
                        // console.log(result);
                        patchState({
                            cartId: result.cart?.id,
                        });
                    });
                }
            });
    }
    @Action(MedusaActions.UpdateCustomerBIllingAddress)
    async updateCustomer(ctx: StateContext<MedusaStateModel>, { payload }: MedusaActions.UpdateCustomerBIllingAddress) {
        // console.log(payload);
        try {
            let customer = this.medusaClient.customers.update({
                billing_address: {
                    first_name: payload?.first_name,
                    last_name: payload?.last_name,
                    address_1: payload.address?.address_1,
                    address_2: payload.address?.address_2,
                    city: payload.address?.city,
                    country_code: payload.address?.country_code,
                    postal_code: payload.address?.postal_code,
                    phone: payload.address?.phone
                }
            });
            this.store.dispatch(new MedusaActions.RetriveCustomer());
            this.store.dispatch(new UserActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                ctx.patchState({
                });
            }
        }
    }
    @Action(MedusaActions.AddBillingAddress)
    async addBillingAddress(ctx: StateContext<MedusaStateModel>, { payload }: MedusaActions.AddBillingAddress) {
        try {
            let customer = this.medusaClient.customers.update({
                billing_address: {
                    first_name: payload?.first_name,
                    last_name: payload?.last_name,
                    address_1: payload?.address_1,
                    address_2: payload?.address_2,
                    city: payload?.city,
                    country_code: payload?.country_code,
                    postal_code: payload?.postal_code,
                    phone: payload?.phone,
                    province: 'Georgia',
                    company: 'Wyman LLC',
                }
            })
            this.store.dispatch(new MedusaActions.RetriveCustomer());
            this.store.dispatch(new UserActions.GetSession());
            console.log(customer);
        } catch (err: any) {
            if (err) {
                ctx.patchState({
                });
            }
        }
    }
    @Action(MedusaActions.LogOut)
    logOut(ctx: StateContext<MedusaStateModel>) {
        ctx.patchState({
            cartId: null,
            cart: null,
            secretKey: null,
        });
    }
}
