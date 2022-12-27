import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from '../store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class HomeFacade {

    @Select(CustomerState.getCustomer) customer$: Observable<any>;
    @Select(CustomerState.isLoggedIn) isLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.isLoggedIn$,
            ]
        ).pipe(
            map((
                [
                    customer,
                    isLoggedIn
                ]
            ) => ({
                customer,
                isLoggedIn
            }))
        );
    }
}
