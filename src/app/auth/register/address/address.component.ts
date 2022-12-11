import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { MessageService, SelectItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { fade } from 'src/app/shared/animations/animations';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { AppStateModel, IRegisterAddress } from 'src/app/store/state.interfaces';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [MessageService],
  styles: [`
 
  `],
  animations: [fade()],
})
export class AddressComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: AddressFormComponent;

  adressForm: FormGroup | any;


  regionsList: any = [];
  countriesList: any = [];

  presentingElement: any;

  private readonly ngUnsubscribe = new Subject();

  public error: any;

  defaultRegion: any;

  userform: FormGroup | any;

  submitted: boolean;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private navigation: NavigationService,
    private utility: UtilityService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.setupForm();
    this.store.dispatch(new MedusaActions.GetMedusaRegionList()).subscribe((state) => {
      this.regionsList = state.medusa.regionList;
      // console.log(this.regionsList);
    });
  }

  onRegionCodeChange(regionId?: string) {
    // console.log(regionId);
    // console.log(this.adressForm.get('region_code').value.id);
    this.countriesList = [];
    this.store.dispatch(new MedusaActions.GetCountries(regionId));
    this.countriesList = this.store.selectSnapshot<any>((state) => state.medusa.countriesList);
  }

  setupForm() {
    this.adressForm = this.formBuilder.group({
      address: [],

    });
  }
  finish() {
    console.log(this.form);
    console.log(this.adressForm.value);
    // console.log(this.adressForm.value.country.iso_2);
    const data: IRegisterAddress = {
      address_1: this.adressForm.value.address?.address_1,
      address_2: this.adressForm.value.address?.address_2,
      region_code: this.adressForm.value.address?.region_code?.id,
      country_code: this.adressForm.value.address?.country?.iso_2,
      city: this.adressForm.value.address?.city,
      postal_code: this.adressForm.value.address?.postal_code,
      phone: this.adressForm.value.address?.phone,
    };
    console.log(data);
    this.navigation.navControllerDefault('/home');
  }
  updateCustomerAddress(shippingAddress: IRegisterAddress) {
    const data: IRegisterAddress = {
      first_name: shippingAddress?.first_name,
      last_name: shippingAddress?.last_name,
      address_1: shippingAddress?.address_1,
      address_2: shippingAddress?.address_2,
      city: shippingAddress?.city,
      country_code: shippingAddress?.country,
      postal_code: shippingAddress?.postal_code,
      phone: shippingAddress?.phone,
      company: 'Wyman LLC',
      province: 'Georgia',
      metadata: {}
    };

    // this.store.dispatch(new MedusaActions.CreateCartWithRegionId(this.defaultRegion[0]?.region_id))
    // this.store.dispatch(new MedusaActions.AddBillingAddress(data));
    // this.store.dispatch(new MedusaActions.AddaShippingAddress(data));
    // this.store.dispatch(new AuthActions.UpdateCustomerRegisterAddress(data));

  }

  get diagnostic() { return JSON.stringify(this.userform.value); }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
