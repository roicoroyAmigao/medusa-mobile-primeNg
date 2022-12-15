import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import Medusa from "@medusajs/medusa-js";
import { AddressesActions } from '../addresses/addresses.actions';
import { environment } from 'src/environments/environment';

export interface AddressesStateModel {
    selectedAddress: any | null;
    regionList: any | any;
    countriesList: any | any;
}
export const initAddressStateModel: AddressesStateModel = {
    selectedAddress: null,
    regionList: null,
    countriesList: null,
};
@State({
    name: 'addresses',
    defaults: initAddressStateModel,
})
@Injectable()
export class AddressesState {
    medusaClient: any;

    constructor(
        private store: Store,
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
    }

    @Selector()
    static getSelectedAddress(state: AddressesStateModel) {
        return state.selectedAddress;
    }
    @Selector()
    static getRegionList(state: AddressesStateModel) {
        return state.regionList;
    }
    @Selector()
    static getCountryList(state: AddressesStateModel) {
        return state.countriesList;
    }
    @Action(AddressesActions.GetRegionList)
    async getMedusaRegionList(ctx: StateContext<AddressesStateModel>) {
        try {
            let response = await this.medusaClient?.regions?.list();
            ctx.patchState({
                regionList: response?.regions,
            });
        } catch (err: any) {
            if (err.response) {
                console.error(err.response);
            }
        }
    }
    @Action(AddressesActions.GetCountries)
    async getCountries(ctx: StateContext<AddressesStateModel>, { regionId }: AddressesActions.GetCountries) {
        try {
            let region = await this.medusaClient?.regions?.retrieve(regionId);
            ctx.patchState({
                countriesList: region.region?.countries
            });
        }
        catch (err: any) {
            if (err.response) {
                console.log(err.response);
            }
        }
    }
    @Action(AddressesActions.AddAddressToState)
    addAddressToState(ctx: StateContext<AddressesStateModel>, { selectedAddress }: AddressesActions.AddAddressToState) {
        // console.log(selectedProduct);
        return ctx.patchState({
            selectedAddress
        });;
    }
    @Action(AddressesActions.RemoveAddressFromState)
    removeAddressFromState(ctx: StateContext<AddressesStateModel>) {
        return ctx.patchState({
            selectedAddress: null
        });;
    }
}
