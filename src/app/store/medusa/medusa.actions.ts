import { IRegisterAddress } from "../state.interfaces";


/* eslint-disable @typescript-eslint/no-namespace */
export namespace MedusaActions {
    export class GetMedusaCart {
        static readonly type = '[MedusaActions] Get Medsa Cart With ID';
        constructor(public cartId: string) { }
    }
    export class GetMedusaRegionList {
        static readonly type = '[MedusaActions] Get Full Medusa Region List';
    }
    export class GetCountries {
        static readonly type = '[MedusaActions] Get Countries';
        constructor(public regionId: string | any) { }
    }
    export class AddaShippingAddress {
        static readonly type = '[MedusaActions] Add a Shipping Address';
        constructor(public payload: IRegisterAddress | any) { }
    }

    export class UpdateCustomerRegisterAddress {
        static readonly type = '[MedusaActions] Update Address for customer Actions';
        constructor(public addressId: string, public payload: any) { }
    }
    export class UpdateaShippingAddress {
        static readonly type = '[MedusaActions] Udate Customer Address';
        constructor(public addressId: string | any, public payload: IRegisterAddress | any) { }
    }
    export class RetriveCustomer {
        static readonly type = '[MedusaActions] Retrive Customer';
    }
    export class AddBillingAddress {
        static readonly type = '[MedusaActions] Add a Billing Address';
        constructor(public payload: IRegisterAddress | any) { }
    }
    export class GetRegionList {
        static readonly type = '[MedusaActions] Get Region List';
    }
    export class UpdateRegionCountryCart {
        static readonly type = '[MedusaActions] Update Region Country Cart';
        constructor(public cartId: string | any, public payload: any | any) { }
    }
    export class UpdateCart {
        static readonly type = '[MedusaActions] Update Cart';
        constructor(public cartId: string | any, public payload: any | any) { }
    }
    export class UpdateSelectedRegion {
        static readonly type = '[MedusaActions] Update Selected Region';
        constructor(public selectedRegion: any | any) { }
    }
    export class UpdateSelectedCountry {
        static readonly type = '[MedusaActions] Update Selected Country';
        constructor(public selectedCountry: any | any) { }
    }
    export class SecretKey {
        static readonly type = '[MedusaActions] Secret Key';
        constructor(public secretKey: string | any) { }
    }
    export class UnSetSecretKey {
        static readonly type = '[MedusaActions] UnSet Secret Key';
    }
    export class AddProductMedusaToCart {
        static readonly type = '[MedusaActions] Add Products to Medusa Cart with Id, variantId and qty';
        constructor(public cartId: string, public quantity: number, public variantId: string) { }
    }
    export class DeleteProductMedusaFromCart {
        static readonly type = '[MedusaActions] Delete Product from Medusa Cart line items';
        constructor(public cart_id: string, public line_id: string,) { }
    }
    export class CreateCartWithRegionId {
        // country_code
        // string
        // The 2 character ISO country code to create the Cart in.
        static readonly type = '[MedusaActions] Create Cart With Region Id';
        constructor(public regionId: string) { }
    }
    export class CreateMedusaCart {
        static readonly type = '[MedusaActions] Create Medusa Cart';
    }
    export class CreateMedusaCartWithItems {
        static readonly type = '[MedusaActions] Create Medusa Cart With Items';
        constructor(public selectedVariant: any) { }
    }
    export class AddProductToState {
        static readonly type = '[MedusaActions] Add product to state';
        constructor(public selectedProduct: any) { }
    }
    export class RemoveProductFromState {
        static readonly type = '[MedusaActions] Clear product from state';
    }

    export class GetMedusaProductList {
        static readonly type = '[MedusaActions] Get Full Medusa Product List';
    }
    export class LogOut {
        static readonly type = '[MedusaActions] Logout, clear shop state';
    }

    export class UpdateCustomer {
        static readonly type = '[MedusaActions] Update Customer';
        constructor(public payload: any | any) { }
    }



















}
