import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
// import Medusa from "@medusajs/medusa-js";
// import { environment } from 'src/environments/environment';
// import { UtilityService } from '../../shared/services/utility.service';
// import { HandleErrorService } from '../../shared/services/handle-error.service';
import { AddressesActions } from '../addresses/addresses.actions';

export interface AddressesStateModel {
    selectedAddress: any | null;
}

export const initAddressStateModel: AddressesStateModel = {
    selectedAddress: null,
};
@State({
    name: 'addresses',
    defaults: initAddressStateModel,
})
@Injectable()
export class AddressesState {
    medusaClient: any;

    constructor(
        // private store: Store,
        // private utility: UtilityService,
        // private handleErrorService: HandleErrorService
    ) {
        // this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }
    @Selector()
    static getSelectedAddress(state: AddressesStateModel) {
        return state.selectedAddress;
    }
    @Action(AddressesActions.AddAddressToState)
    addAddressToState(ctx: StateContext<AddressesStateModel>, { selectedAddress }: AddressesActions.AddAddressToState) {
        // console.log(selectedProduct);
        return ctx.patchState({
            selectedAddress
        });;
    }
    @Action(AddressesActions.RemoveAddressFromState)
    semoveAddressFromState(ctx: StateContext<AddressesStateModel>) {
        return ctx.patchState({
            selectedAddress: null
        });;
    }

}
