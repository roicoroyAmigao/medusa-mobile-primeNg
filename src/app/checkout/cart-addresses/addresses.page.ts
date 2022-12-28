import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { IRegisterAddress } from 'projects/types/types.interfaces';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AddressesFacade } from './addresses.facade';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage {

  @Input() isEdit = false;

  presentingElement: any;

  viewState$: Observable<any>;

  submitted: boolean;

  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private navigation: NavigationService,
    private readonly facade: AddressesFacade,
  ) {
    this.presentingElement = document.querySelector('#main-content');
    this.viewState$ = this.facade.viewState$;
  }
  async updateBillingAddress(address: IRegisterAddress) {
    const cartId = await this.store.selectSnapshot<any>((state: any) => state.cart?.cartId);
    this.store.dispatch(new CartActions.UpdateCartBillingAddress(cartId, address));
  }
  async updateShippingAddress(address: IRegisterAddress) {
    const cartId = await this.store.selectSnapshot<any>((state: any) => state.cart?.cartId);
    this.store.dispatch(new CartActions.UpdateCartShippingAddress(cartId, address));
  }
  async navigateBack() {
    if (this.isEdit === false) {
      await this.navigation.navigateFlip('/shop/orders');
    } else {
      await this.modalCtrl.dismiss();
    }
  }
  async newAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressDetailsComponent,
      componentProps: {
        isNewAddress: true
      }
    });
    await modal.present();
  }
  async viewBilingAddress(address: IRegisterAddress) {
    const modal = await this.modalCtrl.create({
      component: AddressDetailsComponent,
      presentingElement: this.presentingElement,
      componentProps: {
        isNewAddress: false
      }
    });
    this.store.dispatch(new AddressesActions.AddAddressToState(address));
    await modal.present();
  }
  editBillingAddress(address?: IRegisterAddress) {
    this.navigation.navigateFlip('/shop/details');
    this.store.dispatch(new AddressesActions.AddAddressToState(address));
  }
  detailsPage(address?: IRegisterAddress) {
    this.navigation.navigateFlip('/shop/details');
    this.store.dispatch(new AddressesActions.AddAddressToState(address));
  }
  back() {
    this.navigation.navigateFlip('/checkout/flow/start');
  }
  shipping() {
    this.navigation.navigateFlip('/checkout/flow/shipping');
  }
  async openShippingAddressModal(address?: IRegisterAddress) {
    const modal = await this.modalCtrl.create({
      component: AddressDetailsComponent,
      presentingElement: this.presentingElement,
      componentProps: {
        isNewAddress: false
      }
    });
    this.store.dispatch(new AddressesActions.AddAddressToState(address));
    await modal.present();
  }
  async useAddress(customer: any) {
    const cartId = await this.store.selectSnapshot<any>((state: any) => state.cart?.cartId);
    console.log('ggg:: ', customer);
    await this.store.dispatch(new CartActions.UpdateCart(cartId, customer));
  }
}
