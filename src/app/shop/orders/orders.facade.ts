import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';


@Injectable({
    providedIn: 'root'
})
export class OrdersFacade {

    @Select(CustomerState.getCustomer) customer$: Observable<any>;
    @Select(CustomerState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map(([
                customer,
                session,
            ]) => ({
                customer,
                session,
            }))
        );
    }
}
