import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { ProductState } from 'src/app/store/products/products.state';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(ProductState.getProductList) productList$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.getSession) session$: Observable<any>;

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
