/* eslint-disable @typescript-eslint/no-namespace */
export namespace AddressesActions {

    export class AddAddressToState {
        static readonly type = '[AddressesActions] Add address to state';
        constructor(public selectedAddress: any) { }
    }
    export class RemoveAddressFromState {
        static readonly type = '[AddressesActions] Clear address from state';
    }
    export class GetRegionList {
        static readonly type = '[FormsActions] Get Medusa Region List';
    }
    export class GetCountries {
        static readonly type = '[FormsActions] Get Medusa Countries';
        constructor(public regionId: string | any) { }
    }
}
