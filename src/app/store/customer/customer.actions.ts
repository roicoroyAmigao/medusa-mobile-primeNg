import { ICustomerLoginData, ICustomerRegisterData } from "../../../../projects/types/types.interfaces";

export namespace CustomerActions {

    export class Login {
        static readonly type = '[CustomerActions] Login Medusa user and set on state';
        constructor(public payload: ICustomerLoginData) { }
    }
    export class Register {
        static readonly type = '[CustomerActions] Register Medusa user and set on state';
        constructor(public payload: ICustomerRegisterData) { }
    }

    export class LogOutMedusaUser {
        static readonly type = '[CustomerActions] Logout Medusa clear state User';
    }

    export class GetSession {
        static readonly type = '[CustomerActions] Get Medusa Session';
    }
}
