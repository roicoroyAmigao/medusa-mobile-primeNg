import { ILoginData, IRegisterData } from "../state.interfaces";

export namespace UserActions {

    export class MedusaLogin {
        static readonly type = '[UserActions] Login Medusa user and set on state';
        constructor(public payload: ILoginData) { }
    }
    export class MedusaRegister {
        static readonly type = '[UserActions] Register Medusa user and set on state';
        constructor(public payload: IRegisterData) { }
    }

    export class LogOutMedusaUser {
        static readonly type = '[UserActions] Logout Medusa clear state User';
    }

    export class GetSession {
        static readonly type = '[UserActions] Get Medusa Session';
    }
}
