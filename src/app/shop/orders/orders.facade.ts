/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthState } from 'src/app/store/auth/auth.state';


@Injectable({
    providedIn: 'root'
})
export class OrdersFacade implements OnDestroy {

    @Select(AuthState.getCustomer) getCustomer$: Observable<any>;
    
    readonly viewState$: Observable<any>;

    private readonly ngUnsubscribe = new Subject();
    
    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.getCustomer$,
            ]
        ).pipe(
            map(([
                customer,
            ]) => ({
                customer,
            }))
        );
    }
    strapiUserMedusaSync(strapiUserEmail: string) {
    }
    ngOnDestroy(): void {
        this.ngUnsubscribe.next(null);
        this.ngUnsubscribe.complete();
    }
}

