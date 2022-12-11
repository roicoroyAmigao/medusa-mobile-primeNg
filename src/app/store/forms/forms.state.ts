import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface FormsStateModel {
    errors: any | any;
    registerAddress: {
        model: any;
    };
    addressForm: {
        model: any;
    };
    shippingAddress: {
        model: any,
    },
}
export const initFormsStateModel: FormsStateModel = {
    errors: null,
    registerAddress: {
        model: null,
    },
    addressForm: {
        model: null,
    },
    shippingAddress: {
        model: null,
    },
};

@State({
    name: 'forms',
    defaults: initFormsStateModel
})
@Injectable()
export class FormsState {
}
