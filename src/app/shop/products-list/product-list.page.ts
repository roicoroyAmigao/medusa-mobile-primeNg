import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { addSelectedProduct, addSelectedVariant, clearSelectedVariant, GetProductList } from 'src/app/store/products/products.actions';
import { ProductsFacade } from './products.facade';
import { NavigationService } from 'src/app/shared/services/navigation.service';

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

  presentingElement: any = HTMLElement;
  result: any;
  constructor(
    private store: Store,
    private facade: ProductsFacade,
    private primengConfig: PrimeNGConfig,
    private modalCtrl: ModalController,
    private navigation: NavigationService,
  ) {
    this.presentingElement = document.querySelector('#main-content');
    this.viewState$ = this.facade.viewState$;
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
  selectProduct(product: any) {
    this.store.dispatch(new addSelectedProduct(product));
    // console.log(product);
    this.navigation.navigateForward('/product-details');
  }
  async selectVariant(variant: any) {
    this.store.dispatch(new addSelectedVariant(variant));
    const modal = await this.modalCtrl.create({
      component: ProductDetailsModal,
      componentProps: {
        variant: variant
      },
      cssClass: 'dialog-modal'
    });
    await modal.present();
  }
}

//
@Component({
  selector: 'app-product-details-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="dismiss()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Variant Details</ion-title>
      </ion-toolbar>
    </ion-header>
  <ion-content color='warning'>
    <ion-row *ngIf="viewState$ | async as vs">
      <ion-col size='12'>
      {{ vs.selectedVariant.id }}
      </ion-col>
      <ion-col size='12'>
      {{ vs.selectedVariant.title }}
      </ion-col>
    </ion-row>
  </ion-content>
  `,
  styles: [''],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ProductDetailsModal implements OnDestroy {

  @Input() variant: any;

  viewState$: Observable<any>;

  medusaClient: any;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private facade: ProductsFacade,
    private store: Store,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs) => {
    //   console.log(vs);
    // });
  }
  ionViewDidEnter() {
    // console.log(this.variant);
  }
  async dismiss() {
    this.modalCtrl.dismiss();
    this.store.dispatch(new clearSelectedVariant());
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}