export namespace ShippingActions {
    export class GetShippingOptions {
        static readonly type = '[ShippingActions] Shippin Get Shippiing Options';
    }
    export class AddShippingMethod {
        static readonly type = '[ShippingActions] Shippin Add Shipping Method';
        constructor(public option_id: string) { }
    }
    export class CreatePaymentSessions {
        static readonly type = '[ShippingActions] Shipping Create Payment Sessions';
    }
    export class SetPaymentSession {
        static readonly type = '[ShippingActions] Shipping Set Payment Session';
        constructor(public provider_id: string) { }
    }
    export class LogOut {
        static readonly type = '[ShippingActions] Shippin Logout, clear medusa state';
    }
}
