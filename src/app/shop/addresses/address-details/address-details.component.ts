import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { map, Observable, Subject } from 'rxjs';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';
import { AddressesFacade } from '../addresses.facade';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: AddressFormComponent;
  addressForm: FormGroup;
  isEdit: boolean;
  viewState$: Observable<any>;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private store: Store,
    private uttily: UtilityService,
    private readonly facade: AddressesFacade,
  ) {
    this.addressForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      address: [],
    });
    this.viewState$ = this.facade.viewState$;
  }
  ngOnInit() {
    this.populateEditForm();
  }
  ionViewDidEnter() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  async save() {
    const addressData: IRegisterAddress = {
      // id: this.addressForm.value?.id,
      last_name: this.addressForm.value.first_name,
      first_name:this.addressForm.value.last_name,
      address_1: this.addressForm.value.address.address_1,
      address_2: this.addressForm.value.address.address_2,
      region_code: this.addressForm.value.address?.region_code,
      country_code: this.addressForm.value.address?.country,
      city: this.addressForm.value.address.city,
      postal_code: this.addressForm.value.address.postal_code,
      phone: this.addressForm.value.address.phone,
    };
    console.log(addressData);
    console.log(this.addressForm.value);
    // this.updateAdress(this.addressForm.value?.id, addressData);
  }
  async populateEditForm() {
    // await this.uttily.presentLoading('...');
    // const address = await this.store.selectSnapshot<any>((state) => state.addresses.selectedAddress);
    // await setTimeout(async () => {
    //   this.addressForm.get('id')?.setValue(address?.id);
    //   this.addressForm.get('first_name')?.setValue(address?.first_name);
    //   this.addressForm.get('last_name')?.setValue(address?.last_name);
    //   this.form?.adressForm.get('address_1')?.setValue(address?.address_1);
    //   this.form?.adressForm.get('address_2')?.setValue(address?.address_2);

    //   this.form?.adressForm.get('region_code')?.setValue(this.buildRegionCode(address.country_code));
    //   this.form?.adressForm.get('country')?.setValue(address.country_code);

    //   this.form?.adressForm.get('city')?.setValue(address?.city);
    //   this.form?.adressForm.get('postal_code')?.setValue(address?.postal_code);
    //   this.form?.adressForm.get('phone')?.setValue(address?.phone);
    //   await this.uttily.dismissLoading();
    // }, 100);
  }
  buildRegionCode(country_code: string): any {
    const regionList = this.store.selectSnapshot<any>((state) => state.medusa.regionList);
    const countries = regionList.map((region: any, i: any) => region.countries);
    const result = [].concat(...countries);
    const filtered: any = result.filter(async (region: any) => {
      return await region.iso_2 === country_code;
    });
    return filtered[0].region_id;
  }
  updateAdress(addressId: string | any, addressForm: IRegisterAddress) {
    this.store.dispatch(new MedusaActions.UpdateCustomerRegisterAddress(addressId, addressForm));
    this.store.dispatch(new AuthActions.GetSession());
    // this.closeModal();
  }
  saveNewAddress(addressForm?: IRegisterAddress) {
    this.store.dispatch(new MedusaActions.AddaShippingAddress(addressForm));
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.addressForm.reset();
    this.store.dispatch(new AddressesActions.RemoveAddressFromState());
  }
}
