import { ILoginData, IRegisterData } from "../state.interfaces";

export namespace AuthActions {

    export class MedusaLogin {
        static readonly type = '[AuthActions] Login Medusa user and set on state';
        constructor(public payload: ILoginData) { }
    }
    export class MedusaRegister {
        static readonly type = '[AuthActions] Register Medusa user and set on state';
        constructor(public payload: IRegisterData) { }
    }
    export class UpdateCustomerRegisterAddress {
        static readonly type = '[AuthActions] Update Address for customer';
        constructor(public payload: any) { }
    }
    export class LogOutMedusaUser {
        static readonly type = '[AuthActions] Logout Medusa User';
    }
    
    export class GetSession {
        static readonly type = '[AuthActions] Get Medusa Session';
    }
}
