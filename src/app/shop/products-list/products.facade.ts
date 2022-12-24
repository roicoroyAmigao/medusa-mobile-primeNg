import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductState } from 'src/app/store/products/products.state';
import { UserState } from 'src/app/store/medusa-user/user.state';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(ProductState.getProductList) productList$: Observable<any>;

    @Select(UserState.getCustomer) customer$: Observable<any>;

    @Select(UserState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.selectedVariant$,
                this.productList$,
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map((
                [
                    selectedVariant,
                    productList,
                    customer,
                    session
                ]
            ) => ({
                selectedVariant,
                productList,
                customer,
                session
            }))
        );
    }
}
