import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngxs/store";
import { AppAuthService } from "projects/services/src/lib/services/auth.service";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { Observable } from "rxjs";
import { GetProductList, addSelectedProduct, addSelectedVariant } from "src/app/store/products/products.actions";
import { ProductsFacade } from "./products.facade";
import { VariantModalComponent } from "./variant-modal/variant-modal.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage {
  products: any;

  sortOptions: any[];

  sortOrder: number;

  sortField: string;
  sortKey: any;

  viewState$: Observable<any>;

  presentingElement: any = HTMLElement;
  result: any;
  constructor(
    private store: Store,
    private facade: ProductsFacade,
    private modalCtrl: ModalController,
    private navigation: NavigationService,
    private auth: AppAuthService,
  ) {
    this.presentingElement = document.querySelector('#main-content');
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state.productList);
    // });
  }
  ionViewWillEnter() {
    this.store.dispatch(new GetProductList());
  }

  home() {
    this.navigation.navControllerDefault('/home');
  }
  logout() {
    this.auth.logout();
    // this.navigation.navControllerDefault('/home');
  }

  selectProduct(product: any) {
    this.store.dispatch(new addSelectedProduct(product));
    // console.log(product);
    this.navigation.navigateForward('/product-details');
  }
  async selectVariant(variant: any) {
    this.store.dispatch(new addSelectedVariant(variant));
    const modal = await this.modalCtrl.create({
      component: VariantModalComponent,
      componentProps: {
        variant: variant
      },
      cssClass: 'dialog-modal'
    });
    await modal.present();
    await modal.onDidDismiss().then(() => {
      // this.store.dispatch(new clearSelectedVariant());
    });
  }
}
