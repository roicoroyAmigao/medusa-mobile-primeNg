import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { FormsActions } from 'src/app/store/forms/forms.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'projects/types/types.interfaces';
import { UtilityService } from 'projects/services/src/lib/services/utility.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnDestroy {
  @ViewChild('form') form: any;
  @Input() isNewAddress: boolean;
  addressDetailsForm: FormGroup;

  regionsList: any = [];
  countriesList: any = [];
  selectedRegion: string;
  address: any;

  isEdit = false;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private store: Store,
    private uttily: UtilityService,
    private utility: UtilityService,
  ) {
    this.addressDetailsForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      address:
      {
        address_1: '',
        address_2: '',
        region_code: '',
        country: '',
        city: '',
        postal_code: '',
        phone: '',
      },
    });
  }
  ionViewWillEnter() {
    if (!this.isNewAddress) {
      this.populateEditForm();
    } else {
      this.clearForm();
    }
  }
  async save() {
    if (this.isNewAddress === true) {
      const address = {
        first_name: this.addressDetailsForm.value?.first_name,
        last_name: this.addressDetailsForm.value?.last_name,
        address_1: this.addressDetailsForm.value.address?.address_1,
        address_2: this.addressDetailsForm.value.address?.address_2,
        city: this.addressDetailsForm.value.address?.city,
        country_code: this.addressDetailsForm.value.address?.country,
        postal_code: this.addressDetailsForm.value.address?.postal_code,
        phone: this.addressDetailsForm.value.address?.phone
      };
      this.store.dispatch(new MedusaActions.AddaShippingAddress(address));
    }
    if (this.isNewAddress === false) {
      const address = {
        first_name: this.addressDetailsForm.value?.first_name,
        last_name: this.addressDetailsForm.value?.last_name,
        address_1: this.addressDetailsForm.value.address?.address_1,
        address_2: this.addressDetailsForm.value.address?.address_2,
        city: this.addressDetailsForm.value.address?.city,
        country_code: this.addressDetailsForm.value.address?.country,
        postal_code: this.addressDetailsForm.value.address?.postal_code,
        phone: this.addressDetailsForm.value.address?.phone
      };
      console.log(address);
      this.updateAdress(this.addressDetailsForm.value.id, address);
    }
    this.closeModal();
  }
  clear() {
  }
  async populateEditForm() {
    await this.utility.presentLoading('...');
    const regionList = this.store.selectSnapshot<any>((state) => state.addresses.regionList);
    const selectedAddress = this.store.selectSnapshot<any>((state) => state.addresses?.selectedAddress);
    const region_code = this.buildRegionCode(selectedAddress?.country_code, regionList);
    const formModel = {
      id: selectedAddress?.id,
      first_name: selectedAddress?.first_name,
      last_name: selectedAddress?.last_name,
      address: {
        address_1: selectedAddress?.address_1,
        address_2: selectedAddress?.address_2,
        region_code: region_code,
        country: selectedAddress?.country_code,
        city: selectedAddress?.city,
        postal_code: selectedAddress?.postal_code,
        phone: selectedAddress?.phone,
      }
    }
    await this.form?.onRegionCodeChange(region_code);
    setTimeout(async () => {
      this.store.dispatch(new FormsActions.UpdateAddressForm(formModel));
      await this.utility.dismissLoading();
    }, 1000);
  }
  buildRegionCode(country_code: string, regionList: any): string {
    const countries = regionList.map((region: any, i: any) => region.countries);
    const result = [].concat(...countries);
    const filtered: any = result.filter((region: any) => {
      return region.iso_2 === country_code;
    });
    return filtered[0]?.region_id;
  }
  updateAdress(addressId: string | any, addressForm: IRegisterAddress) {
    console.log(addressId, addressForm);
    this.store.dispatch(new MedusaActions.UpdateCustomerAddress(addressId, addressForm));
  }
  saveNewAddress(addressForm?: IRegisterAddress) {
    this.store.dispatch(new MedusaActions.AddaShippingAddress(addressForm));
  }

  clearForm() {
    this.addressDetailsForm.reset();
    this.store.dispatch(new FormsActions.ClearAddressForm());
    this.store.dispatch(new AddressesActions.RemoveAddressFromState());
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    // this.clearForm();
  }
  async closeModal() {
    this.clearForm();
    await this.modalCtrl.dismiss();
  }

}
