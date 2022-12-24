
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { NavigationService } from '../shared/services/navigation.service';
import { StateClear } from 'ngxs-reset-plugin';
import { HomeFacade } from './home.facade';
import { AppAuthService } from '../shared/services/auth.service';

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

    viewState$: Observable<any>;

    isLogged: boolean;

    constructor(
        private store: Store,
        private navigation: NavigationService,
        private facade: HomeFacade,
        private auth: AppAuthService,
    ) { }

    ngOnInit() {
        this.viewState$ = this.facade.viewState$;
    }
    enterShop() {
        this.navigation.navControllerDefault('/shop/products-list');
    }
    enterBlog() {
        this.navigation.navControllerDefault('/shop/products-list');
    }
    logout() {
        this.auth.logout();
        this.navigation.navControllerDefault('/medusa-auth/login');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}