import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent implements OnInit, ControlValueAccessor, OnDestroy {
  
  adressForm: FormGroup | any;

  regionsList: any = [];
  countriesList: any = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  submitted: boolean;

  subscriptions: Subscription[] = [];

  get value() {
    return this.adressForm.value;
  }

  set value(value: any) {
    this.adressForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get passwordControl() {
    return this.adressForm.controls.password;
  }

  get confirmPasswordControl() {
    return this.adressForm.controls.confirmPassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {

    this.adressForm = this.formBuilder.group({
      address_1: new FormControl('blah', Validators.required),
      address_2: new FormControl('blah', Validators.required),
      region_code: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl('blah', Validators.required),
      postal_code: new FormControl('blah', Validators.required),
      phone: new FormControl('123', Validators.compose([
        Validators.required,
      ])),
    });

    this.subscriptions.push(
      this.adressForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(new MedusaActions.GetMedusaRegionList()).subscribe((state) => {
      this.regionsList = state.medusa.regionList;
      console.log(this.regionsList);
    });
  }

  submitAddressForm(adressForm: FormControl) {
    // console.log(adressForm);
    const data: IRegisterAddress = {
      address_1: this.adressForm.value?.address_1,
      address_2: this.adressForm.value?.address_2,
      region_code: this.adressForm.value?.region_code?.id,
      country_code: this.adressForm.value?.country?.iso_2,
      city: this.adressForm.value?.city,
      postal_code: this.adressForm.value?.postal_code,
      phone: this.adressForm.value?.phone,
    };
    console.log(data);
  }

  onRegionCodeChange(regionId?: string) {
    this.countriesList = [];
    this.store.dispatch(new MedusaActions.GetCountries(regionId));
    this.countriesList = this.store.selectSnapshot<any>((state) => state.medusa.countriesList);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.adressForm.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.adressForm.valid ? null : { passwords: { valid: false, }, };
  }

  reset() {
    this.adressForm.reset();
  }

  get diagnostic() { return JSON.stringify(this.adressForm.value); }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
