import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { FormsActions } from './forms.actions';

export interface FormsStateModel {
    errors: any | any;
    registerAddress: {
        model: any;
    };
    addressDetailsForm: {
        model: any;
    };
    addressForm: {
        model: any;
    };
    shippingAddress: {
        model: any,
    },
    strapiUserForm: {
        model: any,
    },
    strapiProfileForm: {
        model: any,
    },
}
export const initFormsStateModel: FormsStateModel = {
    errors: null,
    registerAddress: {
        model: null,
    },
    addressDetailsForm: {
        model: null,
    },
    addressForm: {
        model: null,
    },
    shippingAddress: {
        model: null,
    },
    strapiUserForm: {
        model: null,
    },
    strapiProfileForm: {
        model: null,
    },
};

@State({
    name: 'forms',
    defaults: initFormsStateModel
})
@Injectable()
export class FormsState {

    @Action(FormsActions.UpdateAddressForm)
    updateAddressForm(ctx: StateContext<FormsStateModel>, { addressForm }: FormsActions.UpdateAddressForm) {
        // console.log(addressForm);

        return ctx.patchState({
            addressDetailsForm: {
                model: {
                    id: addressForm?.id,
                    first_name: addressForm?.first_name,
                    last_name: addressForm?.last_name,
                    address: {
                        address_1: addressForm?.address?.address_1,
                        address_2: addressForm?.address?.address_2,
                        region_code: addressForm?.address?.region_code,
                        country: addressForm?.address?.country,
                        city: addressForm?.address?.city,
                        postal_code: addressForm?.address?.postal_code,
                        phone: addressForm?.address?.phone,
                    }
                }
            },
            addressForm: {
                model: {
                    id: addressForm?.id,
                    first_name: addressForm?.first_name,
                    last_name: addressForm?.last_name,
                    address: {
                        address_1: addressForm?.address?.address_1,
                        address_2: addressForm?.address?.address_2,
                        region_code: addressForm?.address?.region_code,
                        country: addressForm?.address?.country,
                        city: addressForm?.address?.city,
                        postal_code: addressForm?.address?.postal_code,
                        phone: addressForm?.address?.phone,
                    }
                }
            }
        });
    }

    @Action(FormsActions.ClearAddressForm)
    clearAddressForm(ctx: StateContext<FormsStateModel>) {
        return ctx.patchState({
            addressDetailsForm: {
                model: {
                    id: null,
                    first_name: null,
                    last_name: null,
                    address: {
                        address_1: null,
                        address_2: null,
                        region_code: null,
                        country: null,
                        city: null,
                        postal_code: null,
                        phone: null,
                    }
                }
            },
            addressForm: {
                model: {
                    id: null,
                    first_name: null,
                    last_name: null,
                    address: {
                        address_1: null,
                        address_2: null,
                        region_code: null,
                        country: null,
                        city: null,
                        postal_code: null,
                        phone: null,
                    }
                }
            }
        });
    }
}
