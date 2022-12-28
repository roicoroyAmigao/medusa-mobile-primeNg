import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StrapiUserActions } from './strapi-user.actions';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { catchError, firstValueFrom, mergeMap, tap, throwError } from 'rxjs';
import { StrapiService } from 'projects/services/src/lib/services/strapi.service';
import { IStrapiLoginData } from 'projects/types/types.interfaces';

export class UserStateModel {
    user: any | any;
    isLoggedIn: boolean | any;
    token: string | any;
    strapiUserId: string | any;
    // avatar: string | any;
}

@State<UserStateModel>({
    name: 'strapiUser',
    defaults: {
        user: null,
        isLoggedIn: null,
        token: null,
        strapiUserId: null,
        // avatar: null,
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

    @Selector()
    static getAvatar(state: UserStateModel): string {
        const avatar = state.user.avatar?.url ? state.user.avatar?.url : 'assets/shapes.svg';
        return avatar;
    }

    @Action(StrapiUserActions.StrapiLogin)
    async strapiLogin(ctx: StateContext<UserStateModel>, { payload }: StrapiUserActions.StrapiLogin) {
        const loginReq: IStrapiLoginData = {
            identifier: payload.identifier,
            password: payload.password,
        };
        this.strapi.strapiLogin(loginReq)
            .pipe(
                catchError((err: HttpErrorResponse) => throwError(() => {
                    // console.log('err0', err);
                    this.store.dispatch(new LogErrorEntry(err));
                    return new Error(err.message)
                })),
            )
            .subscribe(
                {
                    next: (v: { user: { id: any; }; jwt: any; }) => {
                        console.log('v', v);
                        ctx.patchState({
                            user: v.user,
                            isLoggedIn: true,
                            token: v.jwt,
                            strapiUserId: v.user.id,
                        });
                    },
                    error: (err: Error) => {
                        this.store.dispatch(new LogErrorEntry(err));
                        ctx.patchState({
                            isLoggedIn: false,
                        });
                        // console.error(err);
                    },
                    complete: () => {
                        this.store.dispatch(new StrapiUserActions.GetStrapiUser())
                        // console.info('complete');
                    }
                }
            );
    }
    @Action(StrapiUserActions.StrapiRegister)
    async strapiRegister(ctx: StateContext<UserStateModel>, { payload }: StrapiUserActions.StrapiRegister) {
        this.strapi.strapiRegister(payload)
            .pipe(
                catchError((err: HttpErrorResponse) => throwError(() => {
                    console.log('err0', err);
                    this.store.dispatch(new LogErrorEntry(err));
                    return new Error(err.message)
                })),
            ).subscribe(
                {
                    next: (v: any) => {
                        // console.log('v', v);
                        ctx.patchState({
                            user: v.user,
                            isLoggedIn: true,
                            token: v.jwt,
                            strapiUserId: v.user.id,
                        });
                    },
                    error: (err: Error) => {
                        this.store.dispatch(new LogErrorEntry(err));
                        ctx.patchState({
                            isLoggedIn: false,
                        });
                        // console.error(err);
                    },
                    complete: () => {
                        this.store.dispatch(new StrapiUserActions.GetStrapiUser())
                        // console.info('complete');
                    }
                },
            );
    }
    @Action(StrapiUserActions.UpdateStrapiUser)
    updateStrapiUser(ctx: StateContext<UserStateModel>, { profileForm }: StrapiUserActions.UpdateStrapiUser) {
        // const state = ctx.getState();
        const user = this.store.selectSnapshot<any>((state) => state.strapiUser?.user);

        return this.strapi.updateStrapiUserProfile(user?.id, profileForm).subscribe((res: any) => {
            this.store.dispatch(new StrapiUserActions.GetStrapiUser()).subscribe((state) => { });
        });
    }
    @Action(StrapiUserActions.UploadProfileImage)
    async uploadProfileImage(ctx: StateContext<UserStateModel>, { formData }: StrapiUserActions.UploadProfileImage) {
        const res: any = await firstValueFrom(this.strapi.uploadData(formData));
        const fileId = res[0].id;
        const user = this.store.selectSnapshot<any>((state) => state.strapiUser.user);
        if (user && fileId) {
            const updatedUser = await firstValueFrom(this.strapi.setProfileImage(user?.id, fileId));
            this.store.dispatch(new StrapiUserActions.GetStrapiUser());
        }
    }
    @Action(StrapiUserActions.GetStrapiUser)
    getStrapiUser(ctx: StateContext<UserStateModel>) {
        const state = ctx.getState();
        const user = this.store.selectSnapshot<any>((state) => state.strapiUser?.user);
        if (user?.id) {
            this.strapi.loadUser(user?.id)
                .subscribe(
                    {
                        next: (loadedUser: any) => {
                            console.log(loadedUser);
                            ctx.patchState({
                                ...state,
                                user: loadedUser,
                            });
                        },
                        error: (e: any) => console.error(e),
                        complete: () => console.info('complete')
                    }
                );
        }
        if (!user) {
            const err: any = {
                message: 'Need to login first',
            }
            this.store.dispatch(new LogErrorEntry(err));
        }
    }
    @Action(StrapiUserActions.GetStrapiLoggedIn)
    getStrapiLoggedIn(ctx: StateContext<UserStateModel>) {
        try {
            const state = ctx.getState();
            ctx.patchState({
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
            isLoggedIn: false,
            token: null,
            strapiUserId: null,
        });
    }
}
