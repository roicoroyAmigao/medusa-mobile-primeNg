/* eslint-disable @typescript-eslint/no-namespace */
export namespace AddressesActions {

    export class AddAddressToState {
        static readonly type = '[AddressesActions] Add address to state';
        constructor(public selectedAddress: any) { }
    }
    export class RemoveAddressFromState {
        static readonly type = '[AddressesActions] Clear address from state';
    }

}
