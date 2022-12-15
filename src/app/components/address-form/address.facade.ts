/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AddressesState } from 'src/app/store/addresses/addresses.state';
import { AuthState } from 'src/app/store/auth/auth.state';
import { MedusaState } from 'src/app/store/medusa/medusa.state';

@Injectable({
    providedIn: 'root'
})
export class AddressFacade {

    @Select(AddressesState.getSelectedAddress) seletectedAddress$: Observable<any>;
    @Select(AddressesState.getRegionList) regionList$: Observable<any>;
    @Select(AddressesState.getCountryList) countryList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.seletectedAddress$,
                this.regionList$,
                this.countryList$
            ]
        ).pipe(
            map(([
                seletectedAddress,
                regionList,
                countryList
            ]) => ({
                seletectedAddress,
                regionList,
                countryList
            }))
        );
    }
}
