import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersFacade } from './orders.facade';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {

  viewState$: Observable<any>;

  presentingElement: any = HTMLElement;
  
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private navigation: NavigationService,
    private facade: OrdersFacade
  ) {

    this.viewState$ = this.facade.viewState$;
  }
  ngOnInit() {
    this.presentingElement = document.querySelector('#main-content');
    this.store.dispatch(new AuthActions.GetSession());
  }

  async viewAddresses() {
    this.navigation.navigateFlip('/addresses');
  }
  async openOrderDetails(orderId: any) {
    const modal = await this.modalCtrl.create({
      component: OrderDetailsComponent,
      presentingElement: this.presentingElement,
      componentProps: {
        orderId: orderId
      }
    });
    modal.present();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
