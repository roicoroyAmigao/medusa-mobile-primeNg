import { IRegisterAddress } from "../state.interfaces";

export namespace RegisterActions {

    export class AddaShippingAddress {
        static readonly type = '[RegisterActions] Register Add a Shipping Address';
        constructor(public payload: IRegisterAddress | any) { }
    }
    export class AddBillingAddress {
        static readonly type = '[RegisterActions] Register Add a Billing Address';
        constructor(public payload: IRegisterAddress | any) { }
    }
    export class UpdateCustomerRegisterAddress {
        static readonly type = '[AuthActions] Update Address for customer';
        constructor(public payload: any) { }
    }
    export class LogOut {
        static readonly type = '[RegisterActions] Register Logout, clear shop state';
    }
}
