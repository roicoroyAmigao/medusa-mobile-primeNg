import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { CheckoutFacade } from '../checkout.facade';
import { CartReviewComponent } from '../cart-review/cart-review.component';
import { StateClear } from 'ngxs-reset-plugin';
import { AppAuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit, OnDestroy {

  viewState$: Observable<any>;

  isLogged: boolean;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private navigation: NavigationService,
    private facade: CheckoutFacade,
    private store: Store,
    private auth: AppAuthService
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe(async (state) => {
    //   console.log(state);
    //   this.isLogged = await this.store.selectSnapshot<any>((state: any) => state.user?.isLoggedIn);
    //   // console.log(this.isLogged);
    // });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit(): Promise<void> {
    // const cartId = await this.store.selectSnapshot<any>((state: any) => state.cart?.cartId);

    // this.store.dispatch(new CartActions.GetMedusaCart(cartId))
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe),
    //   )
    //   .subscribe((state) => {
    //     // console.log(state.medusaState);
    //   });

    // this.store.dispatch(new CheckoutActions.GetMedusaCart(cartId)).subscribe((state) => {
    //   console.log(state.checkoutState.cart);
    // });
  }
  navigateBack() {
    this.navigation.navigateForward('/shop/products-list', 'back');
  }
  // async openProductsReview() {
  //   const modal = await this.modalCtrl.create({
  //     component: CartReviewComponent,
  //   });
  //   modal.present();
  // }
  cartReviewMedusa() {
    this.navigation.navigateForward('/checkout/flow/cart-review', 'forward');
  }
  addressesMedusa() {
    this.navigation.navigateForward('/checkout/flow/cart-addresses', 'forward');
  }
  loginMedusa() {
    this.navigation.navigateForward('/checkout/flow/medusa-auth/login', 'forward');
  }
  registerMedusa() {
    this.navigation.navigateForward('/checkout/flow/medusa-auth/register/user', 'forward');
  }
  checkoutMedusa() {
    this.navigation.navigateForward('/checkout/flow/shipping', 'forward');
  }
  logoutUser() {
    this.auth.logoutUser();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
