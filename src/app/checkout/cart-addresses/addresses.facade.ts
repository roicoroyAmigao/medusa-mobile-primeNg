import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartState } from 'src/app/store/cart/cart.state';
import { MedusaState } from 'src/app/store/medusa/medusa.state';
import { ProductState } from 'src/app/store/products/products.state';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class AddressesFacade {
    @Select(CartState.getCart) cart$: Observable<any>;
    @Select(UserState.getCustomer) customer$: Observable<any>;
    @Select(UserState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.cart$,
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map(([
                cart,
                customer,
                session
            ]) => ({
                cart,
                customer,
                session
            }))
        );
    }
}