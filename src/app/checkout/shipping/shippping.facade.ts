import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.state';
import { ShippingState } from 'src/app/store/shipping/shipping.state';
import { CustomerState } from 'src/app/store/customer/customer.state';


@Injectable({
    providedIn: 'root'
})
export class ShippingFacade {

    @Select(ShippingState.getShippingOptions) shippingOptions$: Observable<any>;

    @Select(ShippingState.getPaymentSessions) paymentSessions$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isLoggedIn$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {

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
