
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, NgModule, OnDestroy, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MedusaActions } from '../store/medusa/medusa.actions';
import { ProductService } from './product.service';
import { Select, Store } from '@ngxs/store';
import { NavigationService } from '../shared/services/navigation.service';
import { AuthActions } from '../store/auth/auth.actions';

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
        private productService: ProductService,
        private store: Store,
        private navigation: NavigationService,
    ) { }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() {
        // this.store.dispatch(new MedusaActions.GetMedusaProductList())
        //     .subscribe((state) => {
        //         console.log(state.medusa.productsList);
        //         this.products = state.medusa.productsList;
        //     });
    }
    enterShop() {
        this.navigation.navControllerDefault('/shop/products-list');
    }
    logout() {
        this.navigation.navControllerDefault('/auth/login');
        this.store.dispatch(new AuthActions.LogOutMedusaUser());
        this.store.dispatch(new MedusaActions.LogOut());
    }
    testPage() {
        this.navigation.navControllerDefault('/test');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}