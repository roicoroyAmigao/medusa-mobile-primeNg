import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import Medusa from "@medusajs/medusa-js";
import { Order, Customer } from "@medusajs/medusa"
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';

export class AuthStateModel {
    customer: any | any;
    isLoggedIn: boolean | any;
    session: any | any;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        customer: null,
        isLoggedIn: null,
        session: null
    }
})
@Injectable()
export class AuthState {
    medusaClient: any;

    headers_json = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Selector()
    static isLoggedIn(state: AuthStateModel) {
        return state.isLoggedIn;
    }

    @Selector()
    static getCustomer(state: AuthStateModel) {
        return state.customer;
    }

    @Selector()
    static getSession(state: AuthStateModel): Observable<any> {
        return state.session;
    }

    @Action(AuthActions.MedusaLogin)
    async medusaLogin(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.MedusaLogin) {
        try {
            let response = await this.medusaClient.auth?.authenticate(payload);
            console.log(response);
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

    @Action(AuthActions.MedusaRegister)
    async medusaRegister(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.MedusaRegister): Promise<any> {
        const loginReq = {
            email: payload.email,
            password: payload.password,
        };
        try {
            let response = await this.medusaClient.customers?.create(payload);

            await this.store.dispatch(new AuthActions.MedusaLogin(loginReq));
            if (response != null) {
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

    @Action(AuthActions.GetSession)
    async getSession(ctx: StateContext<AuthStateModel>) {

        try {
            let session = await this.medusaClient.auth?.getSession();
            let customer = await this.medusaClient.customers.retrieve();
            console.log(session);
            console.log(customer);
            ctx.patchState({
                session: session?.customer ? session?.customer : null,
                customer: customer?.customer ? customer?.customer : null,
                isLoggedIn: true
            });
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

    @Action(AuthActions.LogOutMedusaUser)
    LogOutMedusaUser(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            customer: null,
            isLoggedIn: false,
        });
    }
}
