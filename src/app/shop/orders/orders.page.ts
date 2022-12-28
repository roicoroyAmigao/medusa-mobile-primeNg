import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersFacade } from './orders.facade';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  viewState$: Observable<any>;

  presentingElement: any = HTMLElement;

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
    this.store.dispatch(new CustomerActions.GetSession());
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
}
