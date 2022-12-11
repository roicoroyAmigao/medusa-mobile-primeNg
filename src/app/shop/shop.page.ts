import { Component } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage {
  cartItemCount: any;
  constructor(
    private menu: MenuController,
  ) { }

  closeCartMenu(menuId: string | undefined) {
    this.menu.toggle(menuId);
  }
}
