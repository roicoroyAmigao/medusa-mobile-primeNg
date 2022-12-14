import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';

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
  @Input() incomingAddress: any;
  adressForm: FormGroup | any;
  regionId: string | any;
  regionsList: any = [];
  countriesList: any = [];
  onChange: any = () => { };
  onTouched: any = () => { };

  subscriptions: Subscription[] = [];

  viewState$: Observable<any>;

  private readonly ngUnsubscribe = new Subject();

  get value() {
    return this.adressForm.value;
  }
  set value(value: any) {
    this.adressForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  get regionCodeControl() {
    return this.adressForm.get('region_code');
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.adressForm = this.formBuilder.group({
      address_1: new FormControl('', Validators.required),
      address_2: new FormControl('', Validators.required),
      region_code: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
    this.subscriptions.push(
      this.adressForm.valueChanges.subscribe((value: any) => {
        if (value?.region_code) {
          this.countriesList = [];
          this.onRegionCodeChange(value?.region_code);
        }
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.regionsList = this.store.selectSnapshot<any>((state) => state.medusa?.regionList);
    const selectedAddress = this.store.selectSnapshot<any>((state) => state.addresses?.selectedAddress);
    this.regionId = this.buildRegionCode(selectedAddress?.country_code);
    if (this.regionId) {
      this.countriesList = [];
      this.onRegionCodeChange(this.regionId);
    }
  }
  buildRegionCode(country_code: string): void {
    const countries = this.regionsList.map((region: any, i: any) => region.countries);
    const result = [].concat(...countries);
    const filtered: any = result.filter((region: any) => {
      return region.iso_2 === country_code;
    });
    return filtered[0]?.region_id;
  }
  onRegionCodeChange(regionId?: string) {
    this.countriesList = [];
    this.store.dispatch(new MedusaActions.GetCountries(regionId));
    return this.countriesList = this.store.selectSnapshot<any>((state) => state.medusa.countriesList);
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
  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.subscriptions.forEach(s => s.unsubscribe());
    this.reset();
    this.countriesList = [];
  }
}
