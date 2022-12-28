import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngxs/store";
import { AppAuthService } from "projects/services/src/lib/services/auth.service";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { Observable } from "rxjs";
import { AuthRoutePath } from "src/app/auth/route-path.enum";
import { CheckoutFacade } from "../checkout.facade";

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
    this.navigation.navigateForward(AuthRoutePath.login, 'forward');
  }
  registerMedusa() {
    this.navigation.navigateForward(AuthRoutePath.user, 'forward');
  }
  checkoutMedusa() {
    this.navigation.navigateForward('/checkout/flow/shipping', 'forward');
  }
  logoutUser() {
    this.auth.logoutUser();
  }
}
