import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { Order, Customer } from "@medusajs/medusa"
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { UserActions } from './user.actions';

export class UserStateModel {
    customer: any | any;
    isLoggedIn: boolean | any;
    session: any | any;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        customer: null,
        isLoggedIn: null,
        session: null
    }
})
@Injectable()
export class UserState {
    medusaClient: any;

    headers_json = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private store: Store,
        private http: HttpClient
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Selector()
    static isLoggedIn(state: UserStateModel) {
        return state.isLoggedIn;
    }
    @Selector()
    static getCustomer(state: UserStateModel) {
        return state.customer;
    }
    @Selector()
    static getSession(state: UserStateModel): Observable<any> {
        return state.session;
    }
    @Action(UserActions.MedusaLogin)
    async medusaLogin(ctx: StateContext<UserStateModel>, { payload }: UserActions.MedusaLogin) {
        try {
            let response = await this.medusaClient.auth?.authenticate(payload);
            console.log(response);
            if (response?.customer != null && response?.status === 200)
                ctx.patchState({
                    customer: response?.customer,
                    isLoggedIn: true,
                });
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

    @Action(UserActions.MedusaRegister)
    async medusaRegister(ctx: StateContext<UserStateModel>, { payload }: UserActions.MedusaRegister): Promise<any> {
        const loginReq = {
            email: payload.email,
            password: payload.password,
        };
        try {
            let response = await this.medusaClient.customers?.create(payload);
            if (response?.customer != null && response?.status === 200) {
                this.store.dispatch(new UserActions.MedusaLogin(loginReq));
                ctx.patchState({
                    customer: response?.customer,
                    isLoggedIn: true,
                });
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

    @Action(UserActions.GetSession)
    async getSession(ctx: StateContext<UserStateModel>) {

        try {
            let sessionRes = await this.medusaClient.auth?.getSession();
            let customerRes = await this.medusaClient.customers.retrieve();

            console.log(sessionRes);
            console.log(customerRes);

            if (sessionRes?.customer != null && sessionRes.response?.status === 200 && customerRes?.customer != null && customerRes.response?.status === 200) {
                ctx.patchState({
                    session: sessionRes?.customer ? sessionRes?.customer : null,
                    customer: customerRes?.customer ? customerRes?.customer : null,
                    isLoggedIn: true
                });
            }
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
                ctx.patchState({
                    session: null,
                    customer: null,
                    isLoggedIn: false
                });
            }
        }
    }

    @Action(UserActions.LogOutMedusaUser)
    LogOutMedusaUser(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            customer: null,
            isLoggedIn: false,
            session: null
        });
    }
}
