/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressesState } from 'src/app/store/addresses/addresses.state';

@Injectable({
    providedIn: 'root'
})
export class AddressFacade {

    @Select(AddressesState.getSelectedAddress) seletectedAddress$: Observable<any> | any;
    @Select(AddressesState.getRegionList) regionList$: Observable<any> | any;
    @Select(AddressesState.getCountryList) countryList$: Observable<any> | any;

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
                // regionList,
                // countryList
            ]) => ({
                seletectedAddress,
                // regionList,
                // countryList
            }))
        ) as any;
    }
}
