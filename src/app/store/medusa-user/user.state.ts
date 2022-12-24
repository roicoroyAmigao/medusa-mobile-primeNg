import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, pipe, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { UserActions } from './user.actions';
import { IRegisterData } from '../state.interfaces';

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
    headers_cookie = new HttpHeaders().set('Cookie', 'connect.sid={sid}');

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
    @Action(UserActions.Login)
    async medusaLogin(ctx: StateContext<UserStateModel>, { payload }: UserActions.Login) {
        const loginReq = {
            email: payload.email,
            password: payload.password,
        };
        try {
            let response = await this.medusaClient.auth?.authenticate(loginReq);
            // console.log(response);
            if (response?.customer != null && response?.status === 200)
                // ctx.patchState({
                //     customer: response?.customer,
                //     isLoggedIn: true,
                // });
                this.store.dispatch(new UserActions.GetSession());
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

    @Action(UserActions.Register)
    async medusaRegister(ctx: StateContext<UserStateModel>, { payload }: UserActions.Register) {
        // console.log(payload);
        const registerRequest: IRegisterData = {
            first_name: payload?.first_name,
            last_name: payload?.last_name,
            email: payload?.email,
            password: payload?.password,
            phone: payload?.phone,
        };
        try {
            let response = await this.medusaClient.customers?.create(registerRequest);
            if (response?.customer != null && response?.status === 200) {
                this.store.dispatch(new UserActions.GetSession())
                // ctx.patchState({
                //     customer: response?.customer,
                //     isLoggedIn: true,
                // });
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

    @Action(UserActions.LogOutMedusaUser)
    LogOutMedusaUser(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            customer: null,
            isLoggedIn: false,
            session: null
        });
    }
}