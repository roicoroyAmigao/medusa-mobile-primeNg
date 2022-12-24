import { IRegisterAddress } from "../state.interfaces";

export namespace MedusaActions {
    export class AddaShippingAddress {
        static readonly type = '[MedusaActions] Add a Shipping Address';
        constructor(public payload: IRegisterAddress | any) { }
    }
    // export class UpdateaShippingAddress {
    //     static readonly type = '[MedusaActions] Udate Customer Address';
    //     constructor(public addressId: string | any, public payload: IRegisterAddress | any) { }
    // }
    export class UpdateCustomerAddress {
        static readonly type = '[MedusaActions] Update Address for customer Actions';
        constructor(public addressId: string, public payload: any) { }
    }
    // export class UpdateCustomerBIllingAddress {
    //     static readonly type = '[MedusaActions] Update Customer';
    //     constructor(public payload: any | any) { }
    // }
    // export class AddBillingAddress {
    //     static readonly type = '[MedusaActions] Add a Billing Address';
    //     constructor(public payload: IRegisterAddress | any) { }
    // }
    export class SecretKey {
        static readonly type = '[MedusaActions] Secret Key';
        constructor(public secretKey: string | any) { }
    }
    export class UnSetSecretKey {
        static readonly type = '[MedusaActions] UnSet Secret Key';
    }
    export class LogOut {
        static readonly type = '[MedusaActions] Logout, clear medusa state';
    }
}
