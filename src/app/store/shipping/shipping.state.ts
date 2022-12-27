import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { environment } from 'src/environments/environment';
import { ShippingActions } from './shipping.actions';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { MedusaActions } from '../medusa/medusa.actions';
import { CustomerActions } from '../customer/customer.actions';

export interface ShippingStateModel {
    shipping_options: any | null;
    payment_sessions: any | any;
    provider_id: any | any;
}
export const initStateModel: ShippingStateModel = {
    shipping_options: null,
    payment_sessions: null,
    provider_id: null,
};
@State({
    name: 'shipping',
    defaults: initStateModel,
})
@Injectable()
export class ShippingState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Selector()
    static getShippingOptions(state: ShippingStateModel) {
        return state.shipping_options;
    }
    @Selector()
    static getPaymentSessions(state: ShippingStateModel) {
        return state.payment_sessions;
    }

    @Action(ShippingActions.GetShippingOptions)
    async getShippingOptions(ctx: StateContext<ShippingStateModel>) {
        try {
            const cart = this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
            const shipping_options = await this.medusaClient.shippingOptions.listCartOptions(cart.id);
            console.log(shipping_options);
            return ctx.patchState({
                shipping_options: shipping_options?.shipping_options
            });
            // this.store.dispatch(new UserActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(ShippingActions.AddShippingMethod)
    async addShippingMethod(ctx: StateContext<ShippingStateModel>, { option_id }: ShippingActions.AddShippingMethod) {
        try {
            const cartObj = this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
            const cart = await this.medusaClient.carts.addShippingMethod(cartObj.id, {
                option_id: option_id
            });
            //   console.log(cart);
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(ShippingActions.CreatePaymentSessions)
    async getSession(ctx: StateContext<ShippingStateModel>) {
        try {
            const cartRes = this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
            const cart = await this.medusaClient.carts.createPaymentSessions(cartRes.id);
            ctx.patchState({
                payment_sessions: cart.cart?.payment_sessions
            });
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(ShippingActions.SetPaymentSession)
    async setPaymentSession(ctx: StateContext<ShippingStateModel>, { provider_id }: ShippingActions.SetPaymentSession) {
        try {
            const cartRes = this.store.selectSnapshot<any>((state: any) => state.cart?.cart);

            const cart = await this.medusaClient.carts.setPaymentSession(cartRes.id, {
                provider_id: provider_id,
            });
            console.log(cart.cart.payment_session.data?.client_secret);
            this.store.dispatch(new MedusaActions.SecretKey(cart.cart.payment_session.data?.client_secret));
            ctx.patchState({
                provider_id: cart.cart?.provider_id
            });

            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(ShippingActions.LogOut)
    logout(ctx: StateContext<ShippingStateModel>) {
        ctx.patchState({
            shipping_options: null,
            payment_sessions: null,
            provider_id: null,
        });
    }
}
