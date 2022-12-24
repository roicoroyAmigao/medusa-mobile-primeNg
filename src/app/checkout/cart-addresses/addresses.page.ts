import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AddressesFacade } from './addresses.facade';

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
    // this.viewState$.subscribe((vs) => {
    //   console.log(vs);
    // });
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
    const cart = await this.store.selectSnapshot<any>((state: any) => state.cart?.cart);
    // const editedCustomer: IRegisterAddress = {
    //   first_name:customer?.first_name,
    //   last_name:customer?.last_name,
    //   address_1: customer.billing_address?.address_1,
    //   address_2: customer.billing_address?.address_2,
    //   city: customer.billing_address?.city,
    //   region_code: customer.billing_address?.region_code,
    //   country: customer.billing_address?.country,
    //   country_code: customer.billing_address?.country_code,
    //   postal_code: customer.billing_address?.postal_code,
    //   region_id: cart.region_id,
    //   phone: customer.billing_address?.phone,
    // };
    console.log('ggg:: ', customer);
    await this.store.dispatch(new CartActions.UpdateCart(cartId, customer));
  }
}
