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
export class AddressesFacade {

    @Select(AddressesState.getSelectedAddress) seletectedAddress$: Observable<any>;
    @Select(AuthState.getCustomer) customer$: Observable<any>;
    @Select(AuthState.getSession) session$: Observable<any>;
    @Select(MedusaState.getCartId) cartId$: Observable<any>;
    @Select(MedusaState.getCart) cart$: Observable<any>;
    @Select(MedusaState.getRegionList) regionList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.seletectedAddress$,
                this.customer$,
                this.session$,
                this.cartId$,
                this.cart$,
                this.regionList$
            ]
        ).pipe(
            map(([
                seletectedAddress,
                customer,
                session,
                cartId,
                cart,
                regionList
            ]) => ({
                seletectedAddress,
                customer,
                session,
                cartId,
                cart,
                regionList
            }))
        );
    }


    buildRegionCode(country_code: string): void {
        const regionsList = this.store.selectSnapshot<any>((state) => state.medusa.regionList);
        const countries = regionsList.map((region: any, i: any) => region.countries);
        const result = [].concat(...countries);
        const filtered: any = result.filter((region: any) => {
            return region.iso_2 === country_code;
        });
        return filtered[0].region_id;
    }


}
