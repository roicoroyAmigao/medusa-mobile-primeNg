import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AddressesFacade } from './addresses.facade';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

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
    this.viewState$.subscribe((vs) => {
      console.log(vs);
    });
  }

  ionViewWillEnter() {
    // this.store.dispatch(new AuthActions.GetSession());
  }
  onCheckboxChange(address: IRegisterAddress, $event: any) {
    // console.log(address, $event.detail);
    // console.log(address, $event.detail.checked);
    this.store.dispatch(new MedusaActions.UpdateCustomerBIllingAddress(address));
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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

}
