import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { FormsActions } from 'src/app/store/forms/forms.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('form') form: any;

  addressForm: FormGroup;

  regionsList: any = [];
  countriesList: any = [];
  selectedRegion: string;
  address: any;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private navigation: NavigationService,
    private formBuilder: FormBuilder,
    private store: Store,
    private utility: UtilityService,
  ) {
    this.addressForm = this.formBuilder.group({
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
      // []
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit(): void {
  }
  async populateEditForm() {
    await this.utility.presentLoading('...');
    this.store.dispatch(new AddressesActions.GetRegionList());
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
    await this.form.onRegionCodeChange(region_code);
    setTimeout(async () => {
      this.store.dispatch(new FormsActions.UpdateAddressForm(formModel));
      await this.utility.dismissLoading();
    }, 1000);
  }
  clearForm() {
    this.addressForm.reset();
    this.store.dispatch(new FormsActions.ClearAddressForm());
  }
  buildRegionCode(country_code: string, regionList: any): any {
    const countries = regionList.map((region: any, i: any) => region.countries);
    const result = [].concat(...countries);
    const filtered: any = result.filter((region: any) => {
      return region.iso_2 === country_code;
    });
    return filtered[0].region_id;
  }
  updateAdress(addressId: string | any, addressForm: IRegisterAddress) {
    this.store.dispatch(new MedusaActions.UpdateCustomerRegisterAddress(addressId, addressForm));
    this.store.dispatch(new AuthActions.GetSession());
  }
  saveNewAddress(addressForm?: IRegisterAddress) {
    this.store.dispatch(new MedusaActions.AddaShippingAddress(addressForm));
  }
  async navigateBack() {
    await this.navigation.navigateFlip('/shop/addresses');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.addressForm.reset();
    this.store.dispatch(new AddressesActions.RemoveAddressFromState());
    this.store.dispatch(new FormsActions.ClearAddressForm());
  }
}
