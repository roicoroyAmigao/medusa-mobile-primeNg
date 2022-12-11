import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Product } from 'src/app/home/interfaces';
import { ProductService } from 'src/app/home/product.service';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { NavigationService } from '../../shared/services/navigation.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ShopFacade } from '../shop.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  sortKey: any;

  viewState$: Observable<any>;

  constructor(
    private store: Store,
    private facade: ShopFacade,
    private utility: UtilityService,
    private navigation: NavigationService,
    private productService: ProductService,
    private primengConfig: PrimeNGConfig
  ) {
    this.viewState$ = this.facade.viewState$;
    this.productService.getProducts().then(data => this.products = data);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

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
    this.store.dispatch(new MedusaActions.GetMedusaProductList());
  }
  async navigateToProductDetails(params: any) {
    console.log(params);
    // this.store.dispatch(new MedusaActions.AddProductToState(params));
    // await this.navigation.navigateForward('/product-details');
  }
}
