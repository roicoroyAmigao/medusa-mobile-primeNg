import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { Observable } from "rxjs";
import { ShippingActions } from "src/app/store/shipping/shipping.actions";
import { ShippingFacade } from "./shippping.facade";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent {

  viewState$: Observable<any>;

  constructor(
    private router: Router,
    private navigation: NavigationService,
    private store: Store,
    private facade: ShippingFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  ionViewWillEnter() {
    this.store.dispatch(new ShippingActions.GetShippingOptions());
  }

  async onAddShippingMethod($event: any) {
    if ($event.detail.value != null) {
      this.store.dispatch(new ShippingActions.AddShippingMethod($event.detail.value));
      this.initPaymentSession();
    }
  }
  async initPaymentSession() {
    this.store.dispatch(new ShippingActions.CreatePaymentSessions());
  }
  async onAddPymentSession($event: any) {
    this.store.dispatch(new ShippingActions.SetPaymentSession($event.detail.value));
  }

  async openPaymentPage() {
    this.router.navigateByUrl('checkout/flow/payment');
  }
  back() {
    this.router.navigateByUrl('checkout/flow/cart-addresses');
  }
  navigateToPayment() {
    this.router.navigateByUrl('checkout/flow/payment');
  }
}
