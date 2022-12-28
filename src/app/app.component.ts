import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CartMenuComponent } from 'projects/components/src/lib/components/app-menu/cart-menu.component';
import { MedusaCartComponent } from 'projects/components/src/lib/components/medusa-cart/medusa-cart.component';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { IonLanguageService } from 'projects/services/src/lib/services/language/language.service';
import { clearSelectedProduct } from './store/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(MedusaCartComponent) medusaCartComponent: MedusaCartComponent;

  @ViewChild(CartMenuComponent) menuComponent: CartMenuComponent;


  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];

  constructor(
    private authService: AppAuthService,
    private ionLanguageService: IonLanguageService,
    public menu: MenuController,
    public store: Store,
    private platform: Platform,
  ) {
    this.initApp();
  }
  async initApp() {
    this.platform.ready().then(() => {
      this.ionLanguageService.initTranslate();
      // this.theme.initTheme();
    });
  }
  checkout() {
    this.menu.toggle('end').then(() => {
      this.medusaCartComponent.goToCheckout();
      this.store.dispatch(new clearSelectedProduct());
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
