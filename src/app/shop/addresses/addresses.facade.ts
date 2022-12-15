import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from 'src/app/store/auth/auth.state';
import { MedusaState } from 'src/app/store/medusa/medusa.state';

@Injectable({
    providedIn: 'root'
})
export class AddressesFacade {
    @Select(AuthState.getCustomer) customer$: Observable<any>;
    @Select(AuthState.getSession) session$: Observable<any>;
    @Select(MedusaState.getCartId) cartId$: Observable<any>;
    @Select(MedusaState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.session$,
                this.cartId$,
                this.cart$,
            ]
        ).pipe(
            map(([
                customer,
                session,
                cartId,
                cart,
            ]) => ({
                customer,
                session,
                cartId,
                cart,
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
