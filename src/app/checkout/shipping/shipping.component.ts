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
