import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { clearSelectedVariant } from 'src/app/store/products/products.actions';
import { ProductsFacade } from '../products.facade';

@Component({
  selector: 'app-variant-modal',
  templateUrl: './variant-modal.component.html',
  styleUrls: ['./variant-modal.component.scss'],
})
export class VariantModalComponent implements OnDestroy {

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
