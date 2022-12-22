import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import Medusa from "@medusajs/medusa-js";
import { environment } from 'src/environments/environment';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent {
  // @Select(CheckoutState.getCheckoutFullCart) getCheckoutFullCart$: Observable<any>;
  // @Select(CheckoutState.getCheckoutCartId) getCartId: Observable<string>;

  stateCartId: Observable<string>;
  cart: any;

  shippingMethods: any;
  shippingMethod: null;

  // paymentSessionsList;
  paymentSessions: any;
  paymentSession: any;

  orderStatus: string;
  regionsList: any;
  regions: any;
  selectedRegion: any;
  countries = [];
  countriesList = [];
  medusaCart: any;
  private subscription = new Subscription();
  viewState$: Observable<any>;
  medusaClient: any;
  presentingElement: any;
  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.presentingElement = document.querySelector('#main-content') as HTMLElement
    this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
  }

  async ionViewWillEnter() {
    this.cart = this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
    // console.log(this.cart);
    const shipping_options = await this.medusaClient.shippingOptions.listCartOptions(this.cart.id);
    this.shippingMethods = shipping_options?.shipping_options;
  }
  back() {
    this.router.navigateByUrl('checkout/flow/addresses');
  }
  async onAddShippingMethod($event: any) {
    // console.log('shippingMethod::', this.shippingMethod);
    // console.log('shippingMethod::', $event.detail.value);
    if (this.shippingMethod != null && $event.detail.value != null) {
      const cart = await this.medusaClient.carts.addShippingMethod(this.cart.id, {
        option_id: $event.detail.value
      });
      if (cart?.cart) {
        return this.initPaymentSession(cart.cart?.id);
      }
    }
  }
  async initPaymentSession(cartId: string | any) {
    // console.log(this.cart.id);
    if (cartId) {
      const cart = await this.medusaClient.carts.createPaymentSessions(cartId);
      this.paymentSessions = cart.cart.payment_sessions;
      this.cart = cart.cart;
    }
  }
  async onAddPymentSession($event: any) {
    const cart = await this.medusaClient.carts.
      setPaymentSession(this.cart.id, {
        provider_id: $event.detail.value
      });
    return this.openPaymentPage(cart.cart.payment_session.data?.client_secret);
  }

  async openPaymentPage(client_secret: any) {
    // console.log(client_secret);
    this.store.dispatch(new MedusaActions.SecretKey(client_secret));
    this.router.navigateByUrl('checkout/flow/payment');
    // this.store.dispatch(new MedusaActions.LogOut());
  }
  // navigateToDelivery() {

  // }
  navigateToPayment() {
    this.router.navigateByUrl('checkout/flow/payment');
  }
}
