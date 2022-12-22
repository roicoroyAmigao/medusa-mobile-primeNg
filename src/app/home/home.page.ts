
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { NavigationService } from '../shared/services/navigation.service';
import { StateClear } from 'ngxs-reset-plugin';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, OnDestroy {
    products!: any[];
    subscription!: Subscription;
    sales: any[];
    constructor(
        private store: Store,
        private navigation: NavigationService,
    ) { }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() {
    }
    enterShop() {
        this.navigation.navControllerDefault('/shop/products-list');
    }
    logout() {
        // this.store.dispatch(new UserActions.LogOutMedusaUser());
        // this.store.dispatch(new MedusaActions.LogOut());
        this.store.dispatch(
            new StateClear()
        );
        this.navigation.navControllerDefault('/medusa-auth/login');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}