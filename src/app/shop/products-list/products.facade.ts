import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { ProductState } from 'src/app/store/products/products.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(ProductState.getProductList) productList$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.getSession) session$: Observable<any>;

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
                this.selectedVariant$,
                this.productList$,
                this.customer$,
                this.session$,
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.user$,
                this.avatar$,
            ]
        ).pipe(
            map((
                [
                    selectedVariant,
                    productList,
                    customer,
                    session,
                    isCustomerLoggedIn,
                    isUserLoggedIn,
                    user,
                    avatar
                ]
            ) => ({
                selectedVariant,
                productList,
                customer,
                session,
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                avatar
            }))
        );
    }
}
