
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { NavigationService } from '../shared/services/navigation.service';
import { StateClear } from 'ngxs-reset-plugin';
import { HomeFacade } from './home.facade';
import { AppAuthService } from '../shared/services/auth.service';
import { Platform } from '@ionic/angular';
import { ThemeService } from '../shared/services/theme-settings.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnDestroy {
    products!: any[];

    subscription!: Subscription;

    viewState$: Observable<any>;

    isLogged: boolean;

    constructor(
        private store: Store,
        private navigation: NavigationService,
        private facade: HomeFacade,
        private auth: AppAuthService,
        private platform: Platform,
        private theme: ThemeService,
    ) { }
    enterShop() {
        this.navigation.navigateForward('/shop/products-list', 'forward');
    }
    enterBlog() {
        this.navigation.navigateForward('/blog/strapi/news', 'forward');
    }
    home() {
        this.navigation.navigateForward('/home', 'forward');
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