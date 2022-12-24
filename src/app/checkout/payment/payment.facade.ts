import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.state';
import { MedusaState } from 'src/app/store/medusa/medusa.state';
import { ShippingState } from 'src/app/store/shipping/shipping.state';
import { UserState } from 'src/app/store/user/user.state';


@Injectable({
    providedIn: 'root'
})
export class PaymentFacade {


    @Select(MedusaState.getSecretKey) secretKey$: Observable<any>;

    @Select(UserState.isLoggedIn) isLoggedIn$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {

        this.viewState$ = combineLatest(
            [
                this.secretKey$,
                this.isLoggedIn$,
                this.cart$,
            ]
        ).pipe(
            map(([
                secretKey,
                isLoggedIn,
                cart
            ]) => ({
                secretKey,
                isLoggedIn,
                cart
            }))
        );
    }
}
