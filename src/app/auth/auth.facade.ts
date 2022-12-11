/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
// import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AuthState } from '../store/auth.state';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {

    // @Select(AuthState.getCustomer) customer$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        // this.viewState$ = combineLatest(
        //     [
        //         this.customer$
        //     ]
        // ).pipe(
        //     map(([
        //         customer
        //     ]) => ({
        //         customer
        //     }))
        // );
    }

}

