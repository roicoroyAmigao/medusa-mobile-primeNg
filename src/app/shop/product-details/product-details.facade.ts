import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductState } from 'src/app/store/products/products.state';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsFacade {

    @Select(ProductState.getSelectedProduct) selectedProduct$: Observable<any>;

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.selectedProduct$,
                this.selectedVariant$,
            ]
        ).pipe(
            map((
                [
                    selectedProduct,
                    selectedVariant,
                ]
            ) => ({
                selectedProduct,
                selectedVariant,
            }))
        );
    }
}
