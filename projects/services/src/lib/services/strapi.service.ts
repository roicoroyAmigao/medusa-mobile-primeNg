import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { IUser } from "projects/types/models/User";
import { IReqAuthRegister } from "projects/types/requests/ReqAuthRegister";
import { IReqPasswordReset } from "projects/types/requests/ReqPasswordReset";
import { IReqUserUpdate } from "projects/types/requests/ReqUserUpdate";
import { IResAuthLogin } from "projects/types/responses/ResAuthLogin";
import { IResAuthRegister } from "projects/types/responses/ResAuthRegister";
import { IResPasswordReset } from "projects/types/responses/ResPasswordReset";
import { IResRequestPasswordReset } from "projects/types/responses/ResRequestPasswordReset";
import { IStrapiLoginData, IStrapiRegisterData } from "projects/types/types.interfaces";
import { lastValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class StrapiService {
    user: any;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    strapiUser: any;

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
    strapiLogin(user: IStrapiLoginData): Observable<any> {
        console.log(user);
        return this.httpClient.post(environment.BASE_PATH + '/api/auth/local', user, { headers: this.headers });
    }
    strapiRegister(registerReq: IStrapiRegisterData) {
        console.log(registerReq);
        return this.httpClient.post(environment.API_BASE_PATH + '/auth/local/register', registerReq)
    }
    public loadUser(userId: string) {
        return this.httpClient.get(environment.BASE_PATH + '/api/users/' + userId + '?populate=*', { headers: this.headers })
    }
    uploadData(formData: any) {
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
    public updateStrapiUserProfile(userId: string | any, profileForm: any): Observable<any> {
        return this.httpClient.put(environment.BASE_PATH + '/api/users/' + userId, profileForm);
    }
    public refreshUserState(user?: { id: any; avatar: any; email: any; username: any; address_1: any; address_2: any; city: any; country_code: null; country: any; first_name: any; last_name: any; phone: any; postal_code: any; provider: any; confirmed: any; blocked: any; role: any; created_by: any; updated_by: any; }) {
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
        }
        catch (error: any) {
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
        }
        catch (error: any) {
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
        } catch (error: any) {
            throw new HttpErrorResponse(error);
        }
    }
    public async callbackProviderLogin(
        params?: string,
        provider?: string
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
        } catch (error: any) {
            throw new HttpErrorResponse(error);
        }
    }
}
