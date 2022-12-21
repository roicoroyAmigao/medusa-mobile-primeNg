/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShopFacade } from 'src/app/shop/shop.facade';

@Component({
  selector: 'cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
})
export class CartMenuComponent {

  viewState$: Observable<any>;

  @Input() menuId: string;

  @Input() icon = 'cart-outline';

  @Input() cartItemCount: number | null = null;

  count: Observable<number>;

  constructor(
    private store: Store,
    public menu: MenuController,
    // private facade: ShopFacade,
  ) {
    // this.viewState$ = this.facade.viewState$;
  }

  closeCartMenu(menuId: any) {
    this.menu.toggle(menuId);
  }
}
