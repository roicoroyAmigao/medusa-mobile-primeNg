import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductCartService } from '../product-details-component/product-cart.service';
import { MedusaCartFacade } from './medusa-cart.facade';

export interface ICartProductItem {
  quantity: any,
  variant: any,
  selectedProduct: any,
  thumbnail: any,
}

@Component({
  selector: 'app-medusa-cart',
  templateUrl: './medusa-cart.component.html',
  styleUrls: ['./medusa-cart.component.scss'],
})
export class MedusaCartComponent implements OnInit, AfterViewInit {
  viewState$: Observable<any>;

  cartForm: FormGroup;

  min = 1;
  max = 10;
  step = 1;
  counterValue: number;
  get counter() {
    return this.counterValue;
  }
  totalCheckout: any;
  user: any | null;
  userId: string | null = null;
  cartId: string;
  newCart: any;
  medusaCart: any;
  constructor(
    private productCartService: ProductCartService,
    public navCtrl: NavController,
    private facade: MedusaCartFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  ngOnInit() {
    this.viewState$
      .subscribe((state) => {
        console.log(state);
        // if (state.medusaFullCart != null) {
        //   this.cartId = state.medusaFullCart.id;
        //   this.medusaCart = state.medusaFullCart;
        // }
      });
  }

  ngAfterViewInit(): void {
    this.productCartService.addCartItem
      .subscribe((productCartItem: any) => {
        console.log(productCartItem);
        // if (productCartItem == null) { return; }

        // if (this.cartId != null) {
        //   // console.log(productCartItem);
        //   // console.log(productCartItem?.id, productCartItem.quantity, this.cartId);
        //   // this.store.dispatch(new ShopActions.AddProductMedusaToCart(productCartItem?.id, productCartItem.quantity, this.cartId));
        // }
        // if (!this.cartId) {

        //   const checkout = {
        //     items: [
        //       {
        //         variant_id: productCartItem?.id,
        //         quantity: productCartItem?.quantity,
        //       }
        //     ]
        //   };
          // console.log(checkout);
          // this.store.dispatch(new ShopActions.CreateMedusaCartWithItems(checkout));
        // }
      });
  }
  incrementSelectItem(item: any) {
    // this.store.dispatch(new ShopActions.AddProductMedusaToCart(item.variant.id, 1, item.cart_id));
  }
  decrementSelectItem(item: any) {
    // return item?.quantity == 1 ?
    //   this.delete(item) :
    //   this.store.dispatch(new ShopActions.AddProductMedusaToCart(item.variant.id, -1, item.cart_id));
  }
  delete(item: any) {
    // this.store.dispatch(new ShopActions.DeleteProductMedusaFromCart(this.cartId, item.id));
  }
  goToCheckout() {
    // this.store.dispatch(new ShopActions.GetMedusaCart(this.cartId));
    this.navCtrl.navigateForward('checkout/flow');
  }
}
