import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AddressesFacade } from './addresses.facade';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {

  @Input() isEdit = false;

  presentingElement: any;

  viewState$: Observable<any>;

  submitted: boolean;

  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private navigation: NavigationService,
    private readonly facade: AddressesFacade,
  ) { }

  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
    this.store.dispatch(new AuthActions.GetSession());
  }

  onCheckboxChange(id: any, $event: any) {
    // console.log(id, $event.detail);
    // console.log(id, $event.detail.checked);
  }
  async navigateBack() {
    if (this.isEdit === false) {
      await this.navigation.navigateFlip('/shop/orders');
    } else {
      await this.modalCtrl.dismiss();
    }
  }
  // async viewBilingAddress() {
  //   const modal = await this.modalCtrl.create({
  //     component: AddressBillingDetailsComponent,
  //   });
  //   await modal.present();
  // }
  shippingAddress() {
    this.navigation.navigateFlip('/shop/details');
  }
  detailsPage(address?: IRegisterAddress) {
    this.navigation.navigateFlip('/shop/details');
    this.store.dispatch(new AddressesActions.AddAddressToState(address));
  }
  async openShippingAddressModal(address?: IRegisterAddress) {
    const modal = await this.modalCtrl.create({
      component: AddressDetailsComponent
    });
    this.store.dispatch(new AddressesActions.AddAddressToState(address));
    await modal.present();
  }
}
