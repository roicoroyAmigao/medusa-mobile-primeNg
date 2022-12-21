import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedusaState } from 'src/app/store/medusa/medusa.state';

@Injectable({
    providedIn: 'root'
})
export class MedusaCartFacade {

    @Select(MedusaState.getCart) getCart$: Observable<any>;
    @Select(MedusaState.getCartId) getCartId$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.getCart$,
                this.getCartId$,
            ]
        ).pipe(
            map((
                [
                    getCart,
                    getCartId
                ]
            ) => ({
                getCart,
                getCartId
            }))
        );
    }
}
