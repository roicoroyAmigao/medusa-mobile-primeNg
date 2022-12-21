import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductState } from 'src/app/store/products/products.state';

@Injectable({
    providedIn: 'root'
})
export class ProductsDetailsFacade {

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;
    @Select(ProductState.getSelectedProduct) selectedProduct$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.selectedVariant$,
                this.selectedProduct$,
            ]
        ).pipe(
            map((
                [
                    selectedVariant,
                    selectedProduct
                ]
            ) => ({
                selectedVariant,
                selectedProduct
            }))
        );
    }
}
