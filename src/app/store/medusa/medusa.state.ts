import { Injectable } from "@angular/core";
import Medusa from "@medusajs/medusa-js";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { CustomerActions } from "../customer/customer.actions";
import { MedusaActions } from "../medusa/medusa.actions";

export interface MedusaStateModel {
    // cartId: string | any;
    // cart: string | any;
    secretKey: any | null;
}

export const initMedusaStateModel: MedusaStateModel = {
    // cartId: null,
    // cart: null,
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
    static getSecretKey(state: MedusaStateModel) {
        return state.secretKey;
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
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                console.log(err);
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
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                ctx.patchState({
                });
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
    @Action(MedusaActions.LogOut)
    logOut(ctx: StateContext<MedusaStateModel>) {
        ctx.patchState({
            // cartId: null,
            // cart: null,
            secretKey: null,
        });
    }
}
