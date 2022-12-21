import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { clearSelectedProduct } from 'src/app/store/products/products.actions';
import { ISelectedProduct } from 'src/app/store/state.interfaces';
import { ProductCartService } from './product-cart.service';
import { ProductsDetailsFacade } from './product-details.facade';

export interface ISelectedCartProduct {
  product: any,
  quantity: unknown,
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  activeFilter = null;

  viewState$: Observable<any>;

  selectedProduct: ISelectedProduct;

  selectedCartProduct: ISelectedCartProduct;

  min = 1;
  max = 10;
  step = 1;

  counterValue: number;

  get counter() {
    return this.counterValue;
  }

  variantsList: any;
  productImages: any;
  variantsUnit: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  selectedVariant: any;

  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private facade: ProductsDetailsFacade,
    private store: Store,
    private productCartService: ProductCartService,
  ) { }

  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      // console.log(state.selectedProduct);
      this.productImages = [];
      this.productImages = state.selectedProduct?.images;
      this.variantsList = [];
      state.selectedProduct?.variants.forEach((variant: any) => {
        const variantWithQuantity = {
          ...variant,
          quantity: this.min,
        };
        this.variantsList.push(variantWithQuantity);
      });
    });
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }
  onSelectVariant(product: any) {
    this.activeFilter = product.id;
    this.selectedVariant = product;
  }
  addToCart(selectedVariant: any) {
    const addToCart = {
      variant_id: selectedVariant?.id,
      quantity: selectedVariant?.quantity,
    };
    console.log(addToCart);

    // this.store.dispatch(new ShopActions.CreateMedusaCartWithItems(selectedVariant));
    this.productCartService.addCartItem.next(selectedVariant);

  }
  increment(variant?: any, index?: any) {
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
    this.navigation.navigateForward('/shop/products-list', 'back');
    this.activeFilter = null;
  }
  ngOnDestroy(): void {
    this.activeFilter = null;
    this.store.dispatch(new clearSelectedProduct());
  }
}
