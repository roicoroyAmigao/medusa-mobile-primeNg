import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../types/models/User';
import { IReqAuthRegister } from '../types/requests/ReqAuthRegister';
import { IReqPasswordReset } from '../types/requests/ReqPasswordReset';
import { IReqUserUpdate } from '../types/requests/ReqUserUpdate';
import { IResAuthLogin } from '../types/responses/ResAuthLogin';
import { lastValueFrom, Observable, Subject, tap } from 'rxjs';
import { IResAuthRegister } from '../types/responses/ResAuthRegister';
import { AlertController } from '@ionic/angular';
import { IResPasswordReset } from '../types/responses/ResPasswordReset';
import { IResRequestPasswordReset } from '../types/responses/ResRequestPasswordReset';

@Injectable({
    providedIn: 'root'
})
export class StrapiService {
    private user: IUser;
    private token: string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    strapiUser;

    constructor(
        private httpClient: HttpClient,
        public alertCtrl: AlertController,
    ) { }

    getAppInfo(): any {
        return this.httpClient.get(environment.BASE_PATH + '/api/app-info?populate=*', { headers: this.headers });
    }
    getAppTheme(): any {
        return this.httpClient.get(environment.BASE_PATH + '/api/app-theme?populate=*', { headers: this.headers });
    }
    login(email: string, password: string): any {
        const data = {
            identifier: email,
            password
        }
        // console.log(data);
        return this.httpClient.post(environment.BASE_PATH + '/api/auth/local', data, { headers: this.headers });
    }

    uploadData(formData) {
        return this.httpClient.post(environment.API_BASE_PATH + '/upload', formData, {});
    }

    setProfileImage(userId: string, fileId: number): any {
        return this.httpClient.put(environment.BASE_PATH + '/api/users/' + userId, {
            data: {
                attachments: fileId,
            },
            avatar: fileId,
        },
            { headers: this.headers }
        );
    }

    register(registerReq) {
        const data = {
            first_name: registerReq.first_name,
            last_name: registerReq.last_name,
            username: registerReq.username,
            email: registerReq.email,
            password: registerReq.password,
        }
        return this.httpClient.post(environment.API_BASE_PATH + '/auth/local/register', data)
    }

    public async registerStrapi(req: IReqAuthRegister): Promise<void> {
        const res: IResAuthRegister | HttpErrorResponse = await this.postRegister(
            req
        );
    }

    private async postRegister(
        registerReq: any
    ): Promise<IResAuthRegister | HttpErrorResponse> {
        try {
            const res: IResAuthRegister | HttpErrorResponse = (await lastValueFrom(
                this.httpClient.post(environment.API_BASE_PATH + '/auth/local/register', {
                    first_name: registerReq.first_name,
                    last_name: registerReq.last_name,
                    username: registerReq.username,
                    email: registerReq.email,
                    password: registerReq.password,

                })
            )) as IResAuthRegister | HttpErrorResponse;

            return res;
        } catch (error) {
            throw new HttpErrorResponse(error);
        }
    }
    public updateStrapiUserProfile(userId, profileForm): Observable<any> {
        return this.httpClient.put(environment.BASE_PATH + '/api/users/' + userId, profileForm);
    }
    public refreshUserState(user?) {
        if (user) {
            const myUser: IUser = {
                id: user?.id,
                avatar: user.avatar,
                email: user?.email,
                username: user?.username,
                address_1: user?.address_1 ?? null,
                address_2: user?.address_2 ?? null,
                city: user?.city ?? null,
                region_code: user?.country_code != null ? user?.country_code : null,
                country: user?.country ?? null,
                first_name: user?.first_name ?? null,
                last_name: user?.last_name ?? null,
                phone: user?.phone ?? null,
                postal_code: user?.postal_code ?? null,
                provider: user.provider ?? null,
                confirmed: user.confirmed ?? null,
                blocked: user.blocked ?? null,
                role: user.role ?? null,
                created_by: user.created_by ?? null,
                updated_by: user.updated_by ?? null,
            };
            console.log('myUser', myUser);
        }
    }
    public async updateProfile(updateReq: IReqUserUpdate): Promise<void> {
        const res: IUser | HttpErrorResponse = await this.updateUser(updateReq);
        if (res) {
            this.user = res as IUser;
        }
    }
    public async requestPasswordReset(email: string): Promise<void> {
        const res: IResRequestPasswordReset | HttpErrorResponse =
            await this.postRequestPasswordReset(email);
    }
    public async resetPassword(
        passwordResetReq: IReqPasswordReset
    ): Promise<void> {
        const res: IResPasswordReset | HttpErrorResponse =
            await this.postResetPassword(passwordResetReq);
    }
    public loadUser(userId) {
        return this.httpClient.get(environment.BASE_PATH + '/api/users/' + userId + '?populate=*', { headers: this.headers })
    }
    private async updateUser(updateReq: any): Promise<IUser | HttpErrorResponse> {
        try {
            const data = {
                data: {
                    oldPassword: updateReq.oldPassword,
                    password: updateReq.password,
                    username: updateReq.username,
                },
            };
            const res: IUser | HttpErrorResponse = (await lastValueFrom(
                this.httpClient.put(environment.BASE_PATH + `/users/me`, data.data, { headers: this.headers })
            )) as IUser | HttpErrorResponse;
            return res;
        } catch (error) {
            throw new HttpErrorResponse(error);
        }
    }
    private async postRequestPasswordReset(
        email: string
    ): Promise<IResRequestPasswordReset | HttpErrorResponse> {
        try {
            const res: IResRequestPasswordReset | HttpErrorResponse =
                (await lastValueFrom(
                    this.httpClient.post(environment.BASE_PATH + '/api/auth/forgot-password', {
                        email
                    }, { headers: this.headers })
                )) as IResRequestPasswordReset | HttpErrorResponse;

            return res;
        } catch (error) {
            throw new HttpErrorResponse(error);
        }
    }
    private async postResetPassword(
        passwordResetReq: IReqPasswordReset
    ): Promise<IResPasswordReset | HttpErrorResponse> {
        try {
            const res: IResPasswordReset | HttpErrorResponse = (await lastValueFrom(
                this.httpClient.post(
                    environment.BASE_PATH + '/api/auth/reset-password',
                    passwordResetReq, { headers: this.headers }
                )
            )) as IResPasswordReset | HttpErrorResponse;

            return res;
        } catch (error) {
            throw new HttpErrorResponse(error);
        }
    }
    public async callbackProviderLogin(
        params?: string,
        provider?
    ): Promise<void> {
        try {
            const res: IResAuthLogin | void = (await lastValueFrom(
                this.httpClient.get(
                    environment.BASE_PATH + '/api/auth/' + provider + '/callback?' + params
                )
            )) as IResAuthLogin | void;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}
