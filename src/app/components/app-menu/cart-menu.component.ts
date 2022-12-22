/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Observer } from 'rxjs';
import { ShopFacade } from 'src/app/shop/shop.facade';
import { AppMenuFacade } from './app-menu.facade';

@Component({
  selector: 'cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
})
export class CartMenuComponent {

  viewState$: Observable<any>;

  @Input() menuId: string;

  @Input() icon = 'cart-outline';

  cartItemsCount: number;

  constructor(
    public menu: MenuController,
    private facade: AppMenuFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      // console.log(state);
      this.cartItemsCount = state.cart.items?.length
    });

  }
  closeCartMenu(menuId: any) {
    this.menu.toggle(menuId);
  }
}
