import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { environment } from 'src/environments/environment';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { CustomerActions } from '../customer/customer.actions';
import { CustomerRegisterActions } from './customer-register.actions';

export interface CustomerRegisterStateModel {
}
export const initRegisterStateModel: CustomerRegisterStateModel = {
};
@State({
    name: 'customerRegister',
    // defaults: initRegisterStateModel,
})
@Injectable()
export class CustomerRegisterState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Action(CustomerRegisterActions.UpdateCustomerRegisterAddress)
    async updateCustomerRegisterAddress(ctx: StateContext<CustomerRegisterStateModel>, { payload }: CustomerRegisterActions.UpdateCustomerRegisterAddress) {
        try {
            let billingAddress = await this.medusaClient.customers?.update({
                billing_address: payload,
            });
            let address = await this.medusaClient.customers.addresses.addAddress({
                address: payload
            })
            if (billingAddress?.customer != null &&
                billingAddress.response?.status === 200 &&
                address?.customer != null &&
                address.response?.status === 200 ) {
            }
            this.store.dispatch(new CustomerActions.GetSession());
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(CustomerRegisterActions.AddaShippingAddress)
    async addaShippingAddress(ctx: StateContext<CustomerRegisterStateModel>, { payload }: CustomerRegisterActions.AddaShippingAddress) {
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
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
    @Action(CustomerRegisterActions.AddBillingAddress)
    async addBillingAddress(ctx: StateContext<CustomerRegisterStateModel>, { payload }: CustomerRegisterActions.AddBillingAddress) {
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
            this.store.dispatch(new CustomerActions.GetSession());
        } catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }
}
