import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { FormsActions } from 'src/app/store/forms/forms.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnDestroy {
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
        region_code: new FormControl(),
        country: '',
        city: '',
        postal_code: '',
        phone: '',
      },
    });
  }
  ionViewWillEnter() {
    // this.populateEditForm();
  }
  save() {
    this.store.dispatch(new MedusaActions.UpdateCustomerBIllingAddress(this.addressForm.value));
    this.navigation.navigateFlip('/shop/addresses');
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
  navigateBack() {
    this.navigation.navigateFlip('/shop/addresses');
  }
  clearForm() {
    this.addressForm.reset();
    this.store.dispatch(new FormsActions.ClearAddressForm());
    this.store.dispatch(new AddressesActions.RemoveAddressFromState());
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.clearForm();
  }
}
