import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent {

  viewState$: Observable<any>;

  isLogged: boolean;

  constructor(
    private navigation: NavigationService,
    private facade: CheckoutFacade,
    private store: Store,
    private auth: AppAuthService
  ) {
    this.viewState$ = this.facade.viewState$;
  }
  navigateBack() {
    this.navigation.navigateForward('/shop/products-list', 'back');
  }
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
}
