import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { HandleErrorService } from "src/app/shared/services/handle-error.service";
import { UtilityService } from "src/app/shared/services/utility.service";
import { environment } from "src/environments/environment";
import { AuthActions } from "../auth/auth.actions";
import { MedusaActions } from "../medusa/medusa.actions";

export interface MedusaStateModel {
    cartId: string | any;
    cart: string | any;
    productsList: any | any;
    selectedProduct: any | null;
    regionList: any | any;
    countriesList: any | any;
    selectedRegion: any | null;
    selectedCountry: any | null;
    retivedCustomer: any | null;
    secretKey: any | null;
    errors: any | any;
}

export const initMedusaStateModel: MedusaStateModel = {
    cartId: null,
    cart: null,
    productsList: null,
    regionList: null,
    countriesList: null,
    selectedProduct: null,
    selectedRegion: null,
    selectedCountry: null,
    retivedCustomer: null,
    secretKey: null,
    errors: null,
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
        private utility: UtilityService,
        private handleErrorService: HandleErrorService
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
    @Selector()
    static getProductList(state: MedusaStateModel) {
        return state.productsList;
    }
    @Selector()
    static getRegionList(state: MedusaStateModel) {
        return state.regionList;
    }
    @Selector()
    static retriveCustomer(state: MedusaStateModel) {
        return state.retivedCustomer;
    }
    @Action(MedusaActions.GetMedusaCart)
    async getMedusaCart(ctx: StateContext<MedusaStateModel>, { cartId }: MedusaActions.GetMedusaCart) {

        ctx.patchState({ errors: null });

        if (cartId != null) {
            try {
                let cart = await this.medusaClient.carts?.retrieve(cartId);
                this.store.dispatch(new AuthActions.GetSession());
                return ctx.patchState({
                    cart: cart?.cart,
                    cartId: cart?.cart.id,
                    selectedRegion: cart?.cart.region_id,
                    selectedCountry: cart.cart?.shipping_address?.country_code,
                    errors: null
                });

            } catch (err: any) {
                if (err.response) {
                    return ctx.patchState({
                        cart: null,
                        errors: err.response,
                    });
                }
            }
        }
    }
    @Action(MedusaActions.GetMedusaRegionList)
    async getMedusaRegionList(ctx: StateContext<MedusaStateModel>) {

        ctx.patchState({ errors: null });

        try {
            let response = await this.medusaClient.regions?.list();
            // console.log(response?.regions);
            ctx.patchState({
                regionList: response?.regions,
                errors: null
            });

        } catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    cart: null,
                    errors: err.response,
                });
            }
        }
    }
    // Get Countrie
    @Action(MedusaActions.GetCountries)
    async getCountries(ctx: StateContext<MedusaStateModel>, { regionId }: MedusaActions.GetCountries) {

        try {
            let region = await this.medusaClient?.regions?.retrieve(regionId)

            // console.log(region.region?.countries);
            this.store.dispatch(new AuthActions.GetSession());

            return ctx.patchState({
                countriesList: region.region?.countries
            })

        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    // AddaShippingAddress
    @Action(MedusaActions.AddaShippingAddress)
    async addaShippingAddress(ctx: StateContext<MedusaStateModel>, { payload }: MedusaActions.AddaShippingAddress) {
        // console.log(payload);
        ctx.patchState({ errors: null });
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
            this.store.dispatch(new AuthActions.GetSession());
        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    // Update a Shipping Address
    @Action(MedusaActions.UpdateaShippingAddress)
    async updateaShippingAddress(ctx: StateContext<MedusaStateModel>, { addressId, payload }: MedusaActions.UpdateaShippingAddress) {
        console.log(addressId, payload);
        ctx.patchState({ errors: null });

        try {
            let customer = await this.medusaClient.customers.addresses.updateAddress(addressId, {
                payload
            });

            console.log(customer);

            this.store.dispatch(new AuthActions.GetSession());

        } catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.UpdateCustomerRegisterAddress)
    async updateCustomerRegisterAddress(ctx: StateContext<MedusaStateModel>, { addressId, payload }: MedusaActions.UpdateCustomerRegisterAddress) {
        // console.log(addressId, payload);
        ctx.patchState({ errors: null });

        try {
            let customer = await this.medusaClient.customers.addresses.updateAddress(addressId, {
                last_name: payload?.last_name,
                first_name: payload?.first_name,
                address_1: payload?.address_1,
                address_2: payload?.address_2,
                city: payload?.city,
                country_code: payload?.country,
                postal_code: payload?.postal_code,
                phone: payload?.phone,
            });

            // console.log(customer);

            this.store.dispatch(new AuthActions.GetSession());

        } catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.RetriveCustomer)
    async retriveCustomer(ctx: StateContext<MedusaStateModel>) {

        ctx.patchState({ errors: null });
        try {
            let customer = await this.medusaClient.customers.retrieve();
            this.store.dispatch(new AuthActions.GetSession());
            await ctx.patchState({
                retivedCustomer: customer.customer
            });
        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.GetRegionList)
    async GetRegionList(ctx: StateContext<MedusaStateModel>, { }: MedusaActions.GetRegionList) {

        ctx.patchState({ errors: null });

        try {
            let region = await this.medusaClient.regions.list();
            await ctx.patchState({
                regionList: region.regions,
            });
        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.UpdateRegionCountryCart)
    async updateRegionCountryCart(ctx: StateContext<MedusaStateModel>, { cartId, payload }: MedusaActions.UpdateRegionCountryCart) {
        // console.log(cartId, payload);

        ctx.patchState({ errors: null });

        try {
            let cart = await this.medusaClient.carts.update(cartId, {
                region_id: payload.region_id != null ? payload.region_id : null,
                country_code: payload?.country_code
            });
            // console.log('cart.cart:::', cart.cart);
            this.store.dispatch(new MedusaActions.UpdateSelectedCountry(cart.cart?.region_id))
            this.store.dispatch(new MedusaActions.UpdateSelectedCountry(cart.cart?.region_id))

            await ctx.patchState({
                selectedRegion: cart.cart?.region_id,
                selectedCountry: cart.cart?.shipping_address?.country_code,
            });
            await this.store.dispatch(new MedusaActions.GetMedusaCart(cart.cart.id));
        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.UpdateCart)
    async updateCart(ctx: StateContext<MedusaStateModel>, { cartId, payload }: MedusaActions.UpdateCart) {
        ctx.patchState({ errors: null });
        try {
            let cart = await this.medusaClient.carts.update(cartId, {
                billing_address: payload.billing_address != null ? payload.billing_address : null,
                customer_id: payload.customer_id != null ? payload.customer_id : null,
                shipping_address: payload.shipping_address != null ? payload.shipping_address : null,
            });
            await this.store.dispatch(new MedusaActions.GetMedusaCart(cart.cart.id));
        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.UpdateSelectedRegion)
    async updateselectedRegion(ctx: StateContext<MedusaStateModel>, { selectedRegion }: MedusaActions.UpdateSelectedRegion) {
        // console.log(selectedRegion);

        ctx.patchState({ errors: null });

        try {
            // console.log('cart.cart:::', cart.cart);
            await ctx.patchState({
                selectedRegion: selectedRegion,
            });
        }
        catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.UpdateSelectedCountry)
    async updateSelectedCountry(ctx: StateContext<MedusaStateModel>, { selectedCountry }: MedusaActions.UpdateSelectedCountry) {
        // console.log(selectedCountry);

        ctx.patchState({ errors: null });

        try {
            // console.log('cart.cart:::', cart.cart);
            return ctx.patchState({
                selectedCountry: selectedCountry,
            });
        }
        catch (err: any) {
            if (err.response) {
                ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.SecretKey)
    async secretKey(ctx: StateContext<MedusaStateModel>, { secretKey }: MedusaActions.SecretKey) {
        // console.log(secretKey);

        ctx.patchState({ errors: null });

        try {
            // console.log('cart.cart:::', cart.cart);
            return ctx.patchState({
                secretKey: secretKey,
            });
        }
        catch (err: any) {
            if (err.response) {
                ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.UnSetSecretKey)
    async unSetSecretKey(ctx: StateContext<MedusaStateModel>) {
        ctx.patchState({ errors: null });
        try {
            return ctx.patchState({
                secretKey: null,
            });
        }
        catch (err: any) {
            if (err.response) {
                ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
    @Action(MedusaActions.AddProductMedusaToCart)
    addProductMedusaToCart({ patchState }: StateContext<MedusaStateModel>, { cartId, quantity, variantId }: MedusaActions.AddProductMedusaToCart) {
        // console.log(variantId, quantity, cartId);
        return this.medusaClient.carts.lineItems.create(cartId, {
            variant_id: variantId,
            quantity: quantity
        })
            .then((result: any) => {
                patchState({
                    cart: result.cart
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
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
            this.store.dispatch(new AuthActions.GetSession());

            if (cart) {
                // console.log(cart);
                ctx.patchState({
                    cart: cart?.cart,
                    cartId: cart?.cart.id,
                    selectedRegion: cart?.cart.region_id,
                    selectedCountry: cart.cart?.shipping_address?.country_code,
                });
            }


        } catch (err: any) {
            if (err.response) {
                // console.log(err);
                this.handleErrorService.handleError(err);
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
    @Action(MedusaActions.AddProductToState)
    addProductToState(ctx: StateContext<MedusaStateModel>, { selectedProduct }: MedusaActions.AddProductToState) {
        // console.log(selectedProduct);
        return ctx.patchState({
            selectedProduct
        });;
    }
    @Action(MedusaActions.RemoveProductFromState)
    clearProductFromState(ctx: StateContext<MedusaStateModel>) {
        return ctx.patchState({
            selectedProduct: null
        });;
    }
    @Action(MedusaActions.GetMedusaProductList)
    getMedusaProductList({ patchState }: StateContext<MedusaStateModel>) {
        return this.medusaClient.products.list().then((result: any) => {
            patchState({
                productsList: result.products,
            });
        });
    }
    @Action(MedusaActions.LogOut)
    logOut(ctx: StateContext<MedusaStateModel>) {
        ctx.patchState({
            cartId: null,
            cart: null,
            productsList: null,
            regionList: null,
            countriesList: null,
            selectedProduct: null,
            selectedRegion: null,
            retivedCustomer: null,
            secretKey: null,
            errors: null,
        });
    }
    @Action(MedusaActions.UpdateCustomer)
    async updateCustomer(ctx: StateContext<MedusaStateModel>, { payload }: MedusaActions.UpdateCustomer) {
        console.log(payload);
        ctx.patchState({ errors: null });
        try {
            let customer = this.medusaClient.customers.update({
                first_name: payload.first_name,
                last_name: payload.last_name,
            });
            this.store.dispatch(new MedusaActions.RetriveCustomer());
            this.store.dispatch(new AuthActions.GetSession());
            // customer.then((customer: any) => {
            //     console.log(customer?.customer);
            // });
        } catch (err: any) {
            if (err.response) {
                ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }

    @Action(MedusaActions.AddBillingAddress)
    async addBillingAddress(ctx: StateContext<MedusaStateModel>, { payload }: MedusaActions.AddBillingAddress) {
        // console.log(payload);
        ctx.patchState({ errors: null });
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
            this.store.dispatch(new AuthActions.GetSession());
            console.log(customer);
        } catch (err: any) {
            if (err.response) {
                ctx.patchState({
                    errors: err.response,
                });
            }
        }
    }
}
