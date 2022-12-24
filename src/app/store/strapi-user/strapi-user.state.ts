import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StrapiUserActions } from './strapi-user.actions';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { UserActions } from '../medusa-user/user.actions';
import { IStrapiLoginData, IStrapiRegisterData } from '../state.interfaces';

export class UserStateModel {
    strapiUser: any | any;
    isLoggedIn: boolean | any;
    token: string | any;
    strapiUserId: string | any;
}

@State<UserStateModel>({
    name: 'strapiUser',
    defaults: {
        strapiUser: null,
        isLoggedIn: null,
        token: null,
        strapiUserId: null,
    }
})
@Injectable()
export class StrapiUserState {
    headers_json = new HttpHeaders().set('Content-Type', 'application/json');
    headers_cookie = new HttpHeaders().set('Cookie', 'connect.sid={sid}');
    constructor(
        private store: Store,
        private http: HttpClient
    ) { }

    @Selector()
    static isLoggedIn(state: UserStateModel) {
        return state.isLoggedIn;
    }

    @Action(StrapiUserActions.StrapiLogin)
    async strapiLogin(ctx: StateContext<UserStateModel>, { payload }: StrapiUserActions.StrapiLogin) {
        const loginReq: IStrapiLoginData = {
            identifier: payload.identifier,
            password: payload.password,
        };
        try {

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

    @Action(StrapiUserActions.StrapiRegister)
    async strapiRegister(ctx: StateContext<UserStateModel>, { payload }: StrapiUserActions.StrapiRegister) {
        // console.log(payload);
        const registerRequest: IStrapiRegisterData = {
            first_name: payload?.first_name,
            last_name: payload?.last_name,
            email: payload?.email,
            password: payload?.password,
            phone: payload?.phone,
        };
        try {

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

    @Action(StrapiUserActions.LogOutStrapiUser)
    logOutStrapiUser(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            strapiUser: null,
            isLoggedIn: null,
            token: null,
            strapiUserId: null,
        });
    }
}
