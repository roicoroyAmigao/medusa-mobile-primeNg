import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MedusaState } from '../store/medusa/medusa.state';
import { ProductState } from '../store/products/products.state';

@Injectable({
    providedIn: 'root'
})
export class ShopFacade {
    @Select(MedusaState.getCart) cart$: Observable<any>;
    @Select(ProductState.getProductList) productList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.cart$,
                this.productList$
            ]
        ).pipe(
            map(([
                cart,
                productList
            ]) => ({
                cart,
                productList
            }))
        );
    }

    getUserDetails() {
        this.viewState$.pipe(tap((state) => {
            console.log(state);
        }));
    }

    filterProductsByCollection(collectionId: string) {
        // console.log(collectionId);
        if (collectionId) {
            this.viewState$
                .pipe(tap((state) => {
                    return state.productList.filter((item: any) => {
                        return item.collection_id === collectionId;
                    });
                }));
        }
    }
}
