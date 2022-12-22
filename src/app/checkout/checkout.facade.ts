import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CartState } from '../store/cart/cart.state';
import { ProductState } from '../store/products/products.state';

@Injectable({
    providedIn: 'root'
})
export class CheckoutFacade {

    @Select(CartState.getCartId) cartId$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;
    @Select(ProductState.getProductList) productList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        // this.store.dispatch(new MedusaState)
        this.viewState$ = combineLatest(
            [
                // this.cart$,
                this.cartId$,
                this.cart$,
                this.productList$,
                // this.selectedProduct$,
            ]
        ).pipe(
            map(([
                // cart,
                cartId,
                cart,
                productList,
                // selectedProduct,
            ]) => ({
                // cart,
                cartId,
                cart,
                productList,
                // selectedProduct,
            }))
        );
    }
}
