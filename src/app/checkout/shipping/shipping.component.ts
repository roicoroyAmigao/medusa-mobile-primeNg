import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
// import Medusa from "@medusajs/medusa-js";
// import { environment } from 'src/environments/environment';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { ShippingFacade } from './shippping.facade';
import { ShippingActions } from 'src/app/store/shipping/shipping.actions';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent {
  stateCartId: Observable<string>;
  cart: any;

  shippingMethods: any;
  shippingMethod: null;

  paymentSessions: any;
  paymentSession: any;

  private subscription = new Subscription();

  viewState$: Observable<any>;

  // medusaClient: any;


  constructor(
    private router: Router,
    private navigation: NavigationService,
    private store: Store,
    private facade: ShippingFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs) => {
    //   console.log(vs.paymentSessions);
    // });
    // this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
  }

  ionViewWillEnter() {
    this.store.dispatch(new ShippingActions.GetShippingOptions());
  }

  async onAddShippingMethod($event: any) {
    if (this.shippingMethod != null && $event.detail.value != null) {
      this.store.dispatch(new ShippingActions.AddShippingMethod($event.detail.value));
      this.initPaymentSession();
    }
  }
  async initPaymentSession() {
    this.store.dispatch(new ShippingActions.CreatePaymentSessions());
  }
  async onAddPymentSession($event: any) {
    let scret_key: string;
    this.store.dispatch(new ShippingActions.SetPaymentSession($event.detail.value))
      .subscribe((state) => {
        // console.log(state.cart.payment_session.data?.client_secret);
        // scret_key = state.cart.payment_session.data?.client_secret;
      });
    // console.log(scret_key);
    // this.store.dispatch(new MedusaActions.SecretKey(state.cart.payment_session.data?.client_secret));
  }

  async openPaymentPage(client_secret?: any) {
    // console.log(client_secret);
    // this.store.dispatch(new MedusaActions.SecretKey(client_secret));
    this.router.navigateByUrl('checkout/flow/payment');
  }
  back() {
    this.router.navigateByUrl('checkout/flow/cart-addresses');
  }
  navigateToPayment() {
    this.router.navigateByUrl('checkout/flow/payment');
  }
}
