import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { ProductState } from 'src/app/store/products/products.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsFacade {

    @Select(ProductState.getSelectedProduct) selectedProduct$: Observable<any>;

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    @Select(StrapiUserState.getAvatar) avatar$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.selectedProduct$,
                this.selectedVariant$,

                this.customer$,
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.user$,
                this.avatar$,
            ]
        ).pipe(
            map((
                [
                    selectedProduct,
                    selectedVariant,
                    customer,
                    isCustomerLoggedIn,
                    isUserLoggedIn,
                    user,
                    avatar
                ]
            ) => ({
                selectedProduct,
                selectedVariant,
                customer,
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                avatar
            }))
        );
    }
}
