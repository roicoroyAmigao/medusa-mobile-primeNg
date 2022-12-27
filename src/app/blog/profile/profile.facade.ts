import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class ProfileFacade {

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.user$,
                this.isCustomerLoggedIn$,
            ]
        ).pipe(
            map((
                [
                    customer,
                    user,
                    isCustomerLoggedIn
                ]
            ) => ({
                customer,
                user,
                isCustomerLoggedIn
            }))
        );
    }
}
