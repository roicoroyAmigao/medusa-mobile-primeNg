export namespace FormsActions {
    export class UpdateAddressForm {
        static readonly type = '[FormsActions] Update Address Form';
        constructor(public addressForm: any) { }
    }
    export class ClearAddressForm {
        static readonly type = '[FormsActions] Clear Address Form';
    }
}
