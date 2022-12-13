import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import Medusa from "@medusajs/medusa-js";
import { Order, Customer } from "@medusajs/medusa"
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../shared/services/utility.service';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ServerErrorInterceptorService } from '../../shared/errors/core/errors/server-error.service';
import { HandleErrorService } from '../../shared/services/handle-error.service';

export class AuthStateModel {
    customer: any | any;
    isLoggedIn: boolean | any;
    errors: any | any;
    session: any | any;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        customer: null,
        isLoggedIn: null,
        errors: null,
        session: null
    }
})
@Injectable()
export class AuthState {
    medusaClient: any;

    headers_json = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private store: Store,
        private utility: UtilityService,
        private http: HttpClient,
        private serverErrors: ServerErrorInterceptorService,
        private handleErrorService: HandleErrorService
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
            return ctx.patchState({
                customer: response?.customer,
                isLoggedIn: true,
                errors: null
            });

        } catch (err: any) {
            if (err.response) {
                this.handleErrorService.handleError(err);
            }
        }
    }

    @Action(AuthActions.MedusaRegister)
    async medusaRegister(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.MedusaRegister): Promise<any> {
        const loginReq = {
            email: payload.email,
            password: payload.password,
        };

        ctx.patchState({ errors: null });

        try {
            let response = await this.medusaClient.customers?.create(payload);
            const res = await response;
            await this.store.dispatch(new AuthActions.MedusaLogin(loginReq));
            
            await ctx.patchState({
                customer: res?.customer,
                isLoggedIn: true,
                errors: null
            });

        } catch (err: any) {
            if (err.response) {
                // console.log(err.message);
                ctx.patchState({
                    customer: null,
                    isLoggedIn: false,
                    errors: err.response,
                });
            }
        }
    }

    @Action(AuthActions.UpdateCustomerRegisterAddress)
    async updateCustomerRegisterAddress(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.UpdateCustomerRegisterAddress) {

        ctx.patchState({ errors: null });

        try {
            let response = await this.medusaClient.customers?.update({
                billing_address: payload,
            });
            let response2 = await this.medusaClient.customers.addresses.addAddress({
                address: payload
            })
            let res = await response;
            let res2 = await response2;
            // console.log(res);
            // console.log(res2);

            await ctx.patchState({
                customer: res?.customer,
                isLoggedIn: true,
                errors: null
            });
            await ctx.patchState({
                customer: res2?.customer,
                isLoggedIn: true,
                errors: null
            });

        } catch (err: any) {
            if (err.response) {
                await ctx.patchState({
                    customer: null,
                    isLoggedIn: false,
                    errors: err.response,
                });
            }
        }
    }

    @Action(AuthActions.GetSession)
    async getSession(ctx: StateContext<AuthStateModel>) {

        ctx.patchState({ errors: null });

        try {
            let response = await this.medusaClient.auth?.getSession();
            let customer = await this.medusaClient.customers.retrieve();

            // console.log(response?.customer);

            return ctx.patchState({
                session: response?.customer,
                customer: response?.customer,
                isLoggedIn: true,
                errors: null
            });

        } catch (err: any) {
            if (err.response) {
                // console.log(err.message);
                return ctx.patchState({
                    session: null,
                    isLoggedIn: false,
                    errors: err.response,
                });
            }
        }
    }

    @Action(AuthActions.LogOutMedusaUser)
    LogOutMedusaUser(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            customer: null,
            isLoggedIn: false,
            errors: null
        });
    }
}
