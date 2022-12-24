import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.state';
import { ShippingState } from 'src/app/store/shipping/shipping.state';
import { UserState } from 'src/app/store/user/user.state';


@Injectable({
    providedIn: 'root'
})
export class ShippingFacade {

    @Select(ShippingState.getShippingOptions) shippingOptions$: Observable<any>;
    @Select(ShippingState.getPaymentSessions) paymentSessions$: Observable<any>;
    @Select(UserState.isLoggedIn) isLoggedIn$: Observable<any>;
    @Select(CartState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {

        this.viewState$ = combineLatest(
            [
                this.shippingOptions$,
                this.paymentSessions$,
                this.isLoggedIn$,
                this.cart$,
            ]
        ).pipe(
            map(([
                shippingOptions,
                paymentSessions,
                isLoggedIn,
                cart
            ]) => ({
                shippingOptions,
                paymentSessions,
                isLoggedIn,
                cart
            }))
        );
    }
}
