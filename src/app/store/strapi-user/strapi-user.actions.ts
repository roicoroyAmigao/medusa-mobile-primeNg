import { IStrapiLoginData, IStrapiRegisterData } from "../../../../projects/types/types.interfaces";

export namespace StrapiUserActions {

    export class StrapiLogin {
        static readonly type = '[StrapiUserActions] Strapi Login Medusa user and set on state';
        constructor(public payload: IStrapiLoginData) { }
    }
    export class StrapiRegister {
        static readonly type = '[StrapiUserActions] Strapi Register Medusa user and set on state';
        constructor(public payload: IStrapiRegisterData) { }
    }
    export class UpdateStrapiUser {
        static readonly type = '[StrapiUserActions] Update Strapi User';
        constructor(public profileForm: any) { }
    }
    export class UploadProfileImage {
        static readonly type = '[StrapiUserActions] Upload Profile Image and set on state';
        constructor(public formData: any) { }
    }
    export class GetStrapiUser {
        static readonly type = '[StrapiUserActions] Get Strapi User';
    }
    export class GetStrapiLoggedIn {
        static readonly type = '[StrapiUserActions] Get Strapi Logged In';
    }
    export class LogOutStrapiUser {
        static readonly type = '[StrapiUserActions] Logout Strapi clear state User';
    }
}
