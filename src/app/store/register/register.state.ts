import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { AddressesActions } from '../addresses/addresses.actions';
import { environment } from 'src/environments/environment';
import { RegisterActions } from './register.actions';
import { MedusaActions } from '../medusa/medusa.actions';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { UserActions } from '../user/user.actions';

export interface RegisterStateModel {
}
export const initRegisterStateModel: RegisterStateModel = {
};
@State({
    name: 'register',
    // defaults: initRegisterStateModel,
})
@Injectable()
export class RegisterState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Action(RegisterActions.UpdateCustomerRegisterAddress)
    async updateCustomerRegisterAddress(ctx: StateContext<RegisterStateModel>, { payload }: RegisterActions.UpdateCustomerRegisterAddress) {
        try {
            let billingAddress = await this.medusaClient.customers?.update({
                billing_address: payload,
            });
            let address = await this.medusaClient.customers.addresses.addAddress({
                address: payload
            })
            console.log(billingAddress);
            console.log(address);
            this.store.dispatch(new UserActions.GetSession());

        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(RegisterActions.AddaShippingAddress)
    async addaShippingAddress(ctx: StateContext<RegisterStateModel>, { payload }: RegisterActions.AddaShippingAddress) {
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
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(RegisterActions.AddBillingAddress)
    async addBillingAddress(ctx: StateContext<RegisterStateModel>, { payload }: RegisterActions.AddBillingAddress) {
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
            });
            // console.log(customer);
            this.store.dispatch(new UserActions.GetSession());
        } catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
}
