import { IStrapiLoginData, IStrapiRegisterData } from "../state.interfaces";

export namespace StrapiUserActions {

    export class StrapiLogin {
        static readonly type = '[StrapiUserActions] Strapi Login Medusa user and set on state';
        constructor(public payload: IStrapiLoginData) { }
    }
    export class StrapiRegister {
        static readonly type = '[StrapiUserActions] Strapi Register Medusa user and set on state';
        constructor(public payload: IStrapiRegisterData) { }
    }
    export class LogOutStrapiUser {
        static readonly type = '[StrapiUserActions] Logout Strapi clear state User';
    }
}
