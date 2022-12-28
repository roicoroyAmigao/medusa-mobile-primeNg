import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { CustomerActions } from './customer.actions';
import { ICustomerRegisterData } from 'projects/types/types.interfaces';
import { Observable } from 'rxjs';

export class CustomerStateModel {
    customer: any | any;
    isLoggedIn: boolean | any;
    session: any | any;
}

@State<CustomerStateModel>({
    name: 'customer',
    defaults: {
        customer: null,
        isLoggedIn: null,
        session: null
    }
})
@Injectable()
export class CustomerState {
    medusaClient: any;

    headers_json = new HttpHeaders().set('Content-Type', 'application/json');
    headers_cookie = new HttpHeaders().set('Cookie', 'connect.sid={sid}');

    constructor(
        private store: Store,
        private http: HttpClient
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Selector()
    static isLoggedIn(state: CustomerStateModel) {
        return state.isLoggedIn;
    }
    @Selector()
    static getCustomer(state: CustomerStateModel) {
        return state.customer;
    }
    @Selector()
    static getSession(state: CustomerStateModel): Observable<any> {
        return state.session;
    }
    @Action(CustomerActions.Login)
    async medusaLogin(ctx: StateContext<CustomerStateModel>, { payload }: CustomerActions.Login) {
        const loginReq = {
            email: payload.email,
            password: payload.password,
        };
        try {
            let response = await this.medusaClient.auth?.authenticate(loginReq);
            // console.log(response);
            // if (response?.customer != null && response?.status === 200)
            if (response) {
                ctx.patchState({
                    customer: response?.customer,
                    isLoggedIn: true,
                });
                this.store.dispatch(new CustomerActions.GetSession());
            }
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
                ctx.patchState({
                    isLoggedIn: false,
                });
            }
        }
    }

    @Action(CustomerActions.Register)
    async medusaRegister(ctx: StateContext<CustomerStateModel>, { payload }: CustomerActions.Register) {
        // console.log(payload);
        const registerRequest: ICustomerRegisterData = {
            first_name: payload?.first_name,
            last_name: payload?.last_name,
            email: payload?.email,
            password: payload?.password,
            phone: payload?.phone,
        };
        try {
            let response = await this.medusaClient.customers?.create(registerRequest);
            if (response?.customer != null && response?.status === 200) {
                this.store.dispatch(new CustomerActions.GetSession())
            }
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
                ctx.patchState({
                    isLoggedIn: false,
                });
            }
        }
    }

    @Action(CustomerActions.GetSession)
    async getSession(ctx: StateContext<CustomerStateModel>) {
        try {
            let sessionRes = await this.medusaClient.auth?.getSession();
            let customerRes = await this.medusaClient.customers.retrieve();
            // console.log('sessionRes');
            // console.log(customerRes);
            if (sessionRes?.customer != null && sessionRes.response?.status === 200 && customerRes?.customer != null && customerRes.response?.status === 200) {
                ctx.patchState({
                    session: sessionRes?.customer ? sessionRes?.customer : null,
                    customer: customerRes?.customer ? customerRes?.customer : null,
                    isLoggedIn: true,
                });
            }
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(CustomerActions.LogOutMedusaUser)
    LogOutMedusaUser(ctx: StateContext<CustomerStateModel>) {
        return ctx.patchState({
            customer: null,
            isLoggedIn: false,
            session: null
        });
    }
}
