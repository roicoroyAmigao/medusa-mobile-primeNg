import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from '../store/cart/cart.state';
import { ProductState } from '../store/products/products.state';
import { UserState } from '../store/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class CheckoutFacade {
    @Select(UserState.isLoggedIn) isLoggedIn$: Observable<any>;
    @Select(CartState.getCartId) cartId$: Observable<any>;
    @Select(CartState.getCart) cart$: Observable<any>;
    @Select(ProductState.getProductList) productList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.isLoggedIn$,
                this.cartId$,
                this.cart$,
                this.productList$,
            ]
        ).pipe(
            map(([
                isLoggedIn,
                cartId,
                cart,
                productList,
            ]) => ({
                isLoggedIn,
                cartId,
                cart,
                productList,
            }))
        );
    }
}