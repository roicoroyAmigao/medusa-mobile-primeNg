import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Product } from 'src/app/home/interfaces';
import { ProductService } from 'src/app/home/product.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AddressesFacade } from './addresses.facade';
import { AddressBillingDetailsComponent } from './billing-address-details/billing-address-details.component';

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
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // private productService: ProductService
  ) { }

  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      console.log(state);
    });
    this.store.dispatch(new AuthActions.GetSession());
    // const cartid = this.store.selectSnapshot<any>((state) => state.medusaState.cartId);
    // this.store.dispatch(new MedusaActions.GetMedusaCart(cartid));
    this.store.dispatch(new MedusaActions.GetMedusaRegionList());
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
  async viewBilingAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressBillingDetailsComponent,
    });
    await modal.present();
  }
  async openShippingAddressModal(address?: IRegisterAddress) {
    const modal = await this.modalCtrl.create({
      component: AddressDetailsComponent,
      componentProps: {
        address: address != null ? address : null,
      }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    const address_form: IRegisterAddress = {
      last_name: data?.last_name,
      first_name: data?.first_name,
      address_1: data?.address_1,
      address_2: data?.address_2,
      city: data?.city,
      country_code: data?.country,
      postal_code: data?.postal_code,
      phone: data?.phone,
    }
    if (data.id === null || data.id === "" && role === 'save') {
      this.saveNewAddress(address_form);
    } else if (data.id != null && role === 'save') {
      const addressId: string = data.id;
      this.updateAdress(addressId, address_form);
    }
  }
  updateAdress(addressId?: any, address_form?: IRegisterAddress) {
    console.log(addressId, address_form);
    this.store.dispatch(new MedusaActions.UpdateCustomerRegisterAddress(addressId, address_form));
  }
  saveNewAddress(address_form?: IRegisterAddress) {
    console.log(address_form);
    this.store.dispatch(new MedusaActions.AddaShippingAddress(address_form));
  }
}


