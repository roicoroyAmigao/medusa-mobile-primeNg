import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from 'src/app/store/cart/cart.state';

@Injectable({
    providedIn: 'root'
})
export class CartReviewFacade {

    @Select(CartState.getCartId) cartId$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                // this.cart$,
                this.cartId$,
                this.cart$,
            ]
        ).pipe(
            map(([
                cartId,
                cart,
            ]) => ({
                cartId,
                cart,
            }))
        );
    }
}
