import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { NavigationService } from '../../shared/services/navigation.service';
import Medusa from "@medusajs/medusa-js";
import { environment } from 'src/environments/environment';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnDestroy {

  @ViewChild(StripePaymentElementComponent)

  paymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions;

  @Input() client_secret: string;

  medusaClient: any;

  cartId: string;

  constructor(
    private stripeService: StripeService,
    private store: Store,
    private router: Router,
    private utility: UtilityService
  ) {
    this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
  }
  ionViewDidEnter() {
    this.cartId = this.store.selectSnapshot<any>((state: any) => state.medusaState?.cartId);
    this.client_secret = this.store.selectSnapshot<any>((state: any) => state.medusaState?.secretKey);
    // this.client_secret = savedSecretKey;
    // console.log(this.client_secret);
    this.elementsOptions = {
      clientSecret: this.client_secret,
    };
  }

  back() {
    this.router.navigateByUrl('checkout/flow/shipping');
  }

  async confirm() {
    this.utility.presentLoading('...');
    return this.stripeService.confirmPayment({
      elements: this.paymentElement.elements,
      redirect: 'if_required'
    }).subscribe(async (result: any) => {
      if (result.error) {
        this.utility.dismissLoading();
        this.utility.showToast(result.error?.message, 'middle', 1500);
      }
      else {
        const cart = await this.medusaClient.carts.complete(this.cartId);
        this.store.dispatch(new MedusaActions.LogOut());
        this.utility.dismissLoading();
        this.utility.presentAlert('Order Placed!', '/home')
      }
    });
  }
  navigateToReview(completedOrder: any) {
    console.log(completedOrder);
    // if (completedOrder) {
    //   // this.navigation.navigateForward('checkout/flow/review');
    // }
  }
  ngOnDestroy() {
    this.store.dispatch(new MedusaActions.UnSetSecretKey());
  }
}
