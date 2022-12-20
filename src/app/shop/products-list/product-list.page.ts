import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { addProduct, addVariant, GetProductList } from 'src/app/store/products/products.actions';
import { ProductsFacade } from './products.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  products: any;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  sortKey: any;

  viewState$: Observable<any>;

  constructor(
    private store: Store,
    private facade: ProductsFacade,
    private primengConfig: PrimeNGConfig
  ) {
    this.viewState$ = this.facade.viewState$;

    // this.viewState$.subscribe((vs) => {
    //   console.log(vs);
    // });

    this.primengConfig.ripple = true;
  }
  onSortChange(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  ngOnInit() {
    this.store.dispatch(new GetProductList());
  }
  async selectProduct(product: any) {
    this.store.dispatch(new addProduct(product));
    // await this.navigation.navigateForward('/product-details');
  }
  async selectVariant(variant: any) {
    this.store.dispatch(new addVariant(variant));
    // await this.navigation.navigateForward('/product-details');
  }
}
