import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StrapiUserActions } from './strapi-user.actions';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { IStrapiLoginData, IStrapiRegisterData } from '../state.interfaces';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { catchError, mergeMap, tap, throwError } from 'rxjs';
import request from '@medusajs/medusa-js/dist/request';

export class UserStateModel {
    user: any | any;
    isLoggedIn: boolean | any;
    token: string | any;
    strapiUserId: string | any;
}

@State<UserStateModel>({
    name: 'strapiUser',
    defaults: {
        user: null,
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
        private http: HttpClient,
        private strapi: StrapiService
    ) { }

    @Selector()
    static isLoggedIn(state: UserStateModel) {
        return state.isLoggedIn;
    }

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(StrapiUserActions.StrapiLogin)
    async strapiLogin(ctx: StateContext<UserStateModel>, { payload }: StrapiUserActions.StrapiLogin) {
        const loginReq: IStrapiLoginData = {
            identifier: payload.identifier,
            password: payload.password,
        };
        this.strapi.strapiLogin(loginReq)
            .pipe(
                // catchError((err: HttpErrorResponse) => throwError(() => {
                //     console.log('err0', err);
                //     this.store.dispatch(new LogErrorEntry(err));
                //     return new Error(err.message)
                // })),
                tap((response) => {
                    // return this.strapi.loadUser(response.user.id)
                    //     .subscribe((loadedUser) => {
                    //         // console.log('loadedUser', loadedUser);
                    //         return ctx.patchState({
                    //             user: loadedUser,
                    //             isLoggedIn: true,
                    //             token: response.jwt,
                    //             strapiUserId: response.user.id,
                    //         });
                    //     });
                })
            ).subscribe(
                (response) => {
                    console.log('loadedUser', response.user);
                    return this.strapi.loadUser(response.user.id)
                        .subscribe((loadedUser) => {
                            console.log('loadedUser', loadedUser);
                            return ctx.patchState({
                                user: loadedUser,
                                isLoggedIn: true,
                                token: response.jwt,
                                strapiUserId: response.user.id,
                            });
                        });
                },
                (err) => {
                    // console.log('err1', err);
                    // this.store.dispatch(new LogErrorEntry(err));
                    // ctx.patchState({
                    //     isLoggedIn: false,
                    // });
                }
            );
    }

    @Action(StrapiUserActions.StrapiRegister)
    async strapiRegister(ctx: StateContext<UserStateModel>, { payload }: StrapiUserActions.StrapiRegister) {
        // console.log(payload);
        // console.log(payload);
        this.strapi.strapiRegister(payload)
            .pipe(
                tap((response: any) => {
                    console.log(response.user.id);
                })
            ).subscribe(
            // (response) => {
            //     console.log(response.user.id);
            //     // return this.strapi.loadUser(response.user.id)
            //     //     .subscribe((loadedUser) => {
            //     //         // console.log('loadedUser', loadedUser);
            //     //         return ctx.patchState({
            //     //             user: loadedUser,
            //     //             isLoggedIn: true,
            //     //             token: response.jwt,
            //     //             strapiUserId: response.user.id,
            //     //         });
            //     //     });
            // }
        );
    }
    @Action(StrapiUserActions.UploadProfileImage)
    async uploadProfileImage(ctx: StateContext<UserStateModel>, { formData }: StrapiUserActions.UploadProfileImage) {

        this.strapi.uploadData(formData)
            .subscribe((response: any) => {
                if (response) {
                    const fileId = response[0].id;
                    const user = this.store.selectSnapshot<any>((state) => state.strapiUser.user);
                    this.strapi.setProfileImage(user?.id, fileId)
                        .subscribe((resUser: any) => {
                            // console.log(resUser);
                            this.strapi.loadUser(user?.id)
                                .subscribe((loadedUser) => {
                                    console.log('loadedUser', loadedUser);
                                    return ctx.patchState({
                                        user: loadedUser,
                                        isLoggedIn: true,
                                        token: response.jwt,
                                        strapiUserId: response.user.id,
                                    });
                                });
                        });
                }
            });
    }


    @Action(StrapiUserActions.GetStrapiUser)
    getStrapiUser(ctx: StateContext<UserStateModel>) {
        const state = ctx.getState();
        const user = this.store.selectSnapshot<any>((state) => state.strapiUser?.user);
        this.strapi.loadUser(user?.id)
            .subscribe((loadedUser) => {
                // console.log('loadedUser', loadedUser);
                return ctx.patchState({
                    ...state,
                    user: loadedUser,
                });
            });
    }
    @Action(StrapiUserActions.GetStrapiLoggedIn)
    getStrapiLoggedIn(ctx: StateContext<UserStateModel>) {
        try {
            const state = ctx.getState();
            return ctx.patchState({
                ...state,
            });
        }
        catch (err: any) {
            if (err) {
                this.store.dispatch(new LogErrorEntry(err));
            }
        }
    }

    @Action(StrapiUserActions.LogOutStrapiUser)
    logOutStrapiUser(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            user: null,
            isLoggedIn: null,
            token: null,
            strapiUserId: null,
        });
    }
}
