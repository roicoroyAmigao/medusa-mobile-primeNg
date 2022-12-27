import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class AddressFacade {
    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.customer$,
            ]
        ).pipe(
            map(([
                customer,
            ]) => ({
                customer,
            }))
        );
    }
}
