import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PrimeNGConfig } from 'primeng/api';
import { CartMenuComponent } from './components/app-menu/cart-menu.component';
import { MedusaCartComponent } from './components/medusa-cart/medusa-cart.component';
import { AppAuthService } from './shared/services/auth.service';
import { IonLanguageService } from './shared/services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild(MedusaCartComponent) medusaCartComponent: MedusaCartComponent;

  @ViewChild(CartMenuComponent) menuComponent: CartMenuComponent;


  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AppAuthService,
    private ionLanguageService: IonLanguageService,
    public menu: MenuController,
  ) { }

  ngOnInit() {
    this.ionLanguageService.initTranslate();
  }
  checkout() {
    // this.menuComponent.closeCartMenu('end');
    this.menu.toggle('end').then(() => {
      this.medusaCartComponent.goToCheckout();
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
