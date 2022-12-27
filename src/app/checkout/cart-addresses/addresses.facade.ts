import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState } from 'src/app/store/cart/cart.state';
import { CustomerState } from 'src/app/store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class AddressesFacade {
    @Select(CartState.getCart) cart$: Observable<any>;
    @Select(CustomerState.getCustomer) customer$: Observable<any>;
    @Select(CustomerState.getSession) session$: Observable<any>;

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
