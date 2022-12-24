import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CheckoutFacade } from 'src/app/checkout/checkout.facade';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { CartReviewFacade } from './cart-review.facade';

@Component({
  selector: 'app-cart-review',
  templateUrl: './cart-review.component.html',
  styleUrls: ['./cart-review.component.scss'],
})
export class CartReviewComponent {

  viewState$: Observable<any>;

  min = 1;
  max = 10;
  step = 1;

  counterValue: number | any;
  get counter() {
    return this.counterValue;
  }


  constructor(
    public navCtrl: NavController,
    private store: Store,
    private facade: CartReviewFacade,
    private navigation: NavigationService,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  incrementSelectItem(item: any) {
    this.store.dispatch(new CartActions.AddProductMedusaToCart(item.cart_id, 1, item.variant.id,));
  }
  decrementSelectItem(item: any) {
    return item?.quantity == 1 ?
      this.delete(item) :
      this.store.dispatch(new CartActions.AddProductMedusaToCart(item.cart_id, -1, item.variant.id));
  }
  delete(item: any) {
    this.store.dispatch(new CartActions.DeleteProductMedusaFromCart(item.cart_id, item.id));
  }
  start() {
    this.navigation.navigateFlip('checkout/flow/start');
  }
  addresses() {
    this.navigation.navigateFlip('checkout/flow/cart-addresses');
  }
}
