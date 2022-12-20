import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MedusaState } from 'src/app/store/medusa/medusa.state';
import { ProductState } from 'src/app/store/products/products.state';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class AddressesFacade {
    @Select(MedusaState.getCart) cart$: Observable<any>;
    @Select(ProductState.getProductList) productList$: Observable<any>;

    @Select(UserState.getCustomer) customer$: Observable<any>;
    @Select(UserState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.cart$,
                this.productList$,
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map(([
                cart,
                productList,
                customer,
                session
            ]) => ({
                cart,
                productList,
                customer,
                session
            }))
        );
    }
}
