import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { clearSelectedProduct } from 'src/app/store/products/products.actions';
import { ISelectedCartProduct } from 'projects/types/types.interfaces';
import { ProductDetailsFacade } from './product-details.facade';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit, OnDestroy {

  activeFilter = null;

  viewState$: Observable<any>;

  selectedCartProduct: ISelectedCartProduct | any;

  min = 1;
  max = 10;
  step = 1;

  counterValue: number | any;
  get counter() {
    return this.counterValue;
  }

  variantsList: any;

  productImages: any;

  variantsUnit: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  selectedVariant: any;

  selectedProduct: any;

  cartId: string;

  constructor(
    private navigation: NavigationService,
    private facade: ProductDetailsFacade,
    private store: Store,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs) => {
    //   console.log(vs);
    // });
  }

  ngOnInit(): void {
    this.cartId = this.store.selectSnapshot<any>((state) => state.cart?.cartId);
    this.selectedProduct = this.store.selectSnapshot<any>((state) => state.product.selectedProduct);
    this.productImages = [];
    this.productImages = this.selectedProduct?.images;
  }
  onSelectVariant(variant: any) {
    this.activeFilter = variant.id;
    this.selectedVariant = variant;
  }
  addToCart(selectedVariant: any) {
    const cartId = this.store.selectSnapshot<any>((state) => state.cart?.cartId);
    if (cartId != null && selectedVariant != null) {
      this.store.dispatch(new CartActions.AddProductMedusaToCart(cartId, 1, selectedVariant?.id));
    } else {
      this.store.dispatch(new CartActions.CreateMedusaCart()).subscribe((state) => {
        this.store.dispatch(new CartActions.AddProductMedusaToCart(state.cart?.cartId, 1, selectedVariant?.id));
      });
    }
  }
  increment(variant?: any, index?: any) {
    // console.log(variant, index);
    let counterValue = variant.quantity;
    if (counterValue < this.max) {
      counterValue = counterValue + this.step;
      this.variantsList[index].quantity = counterValue;
    }
  }
  decrement(variant?: any, index?: any) {
    let counterValue = variant.quantity;
    if (counterValue > this.min) {
      counterValue = counterValue - this.step;
      this.variantsList[index].quantity = counterValue;
    }
  }
  navigateToProductList() {
    this.selectedProduct = [];
    this.activeFilter = null;
    this.navigation.navigateForward('/shop/products-list', 'back');
    this.store.dispatch(new clearSelectedProduct());
  }
  ngOnDestroy(): void {
    this.activeFilter = null;
    this.store.dispatch(new clearSelectedProduct());
  }
}
