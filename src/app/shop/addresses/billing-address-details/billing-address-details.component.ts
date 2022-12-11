import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';

@Component({
  selector: 'app-billing-address-details',
  templateUrl: './billing-address-details.component.html',
  styleUrls: ['./billing-address-details.component.scss'],
})
export class AddressBillingDetailsComponent implements OnInit, OnDestroy {
  // @Input() billing_address_id: any;
  billing_address_form: FormGroup;
  regionsList: any = [];
  countriesList: any = [];
  cart: any;
  medusaClient: any;
  selectedRegion: string;
  error: any;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private store: Store,
    private utility: UtilityService,
  ) { }

  ionViewWillEnter() {
    // this.store.dispatch(new MedusaActions.GetMedusaRegionList());
  }
  ngOnInit() {
    this.setupForm();
    this.store.dispatch(new MedusaActions.RetriveCustomer());
  }
  ionViewDidEnter() {
    this.regionsList = [];
    const cartid = this.store.selectSnapshot<any>((state) => state.medusaState.cartId);
    this.store.dispatch(new MedusaActions.GetMedusaCart(cartid));
    this.selectedRegion = this.store.selectSnapshot<any>((state) => state.medusaState.selectedRegion);
    this.regionsList = this.store.selectSnapshot<any>((state) => state.medusaState.regionList);
    const retrivedCustomer = this.store.selectSnapshot<any>((state) => state.medusaState.retivedCustomer);
    if (retrivedCustomer) {
      this.populateEditForm(retrivedCustomer);
    }
    if (this.selectedRegion != null) {
      this.onRegionCodeChange(this.selectedRegion);
    }
  }
  async closeModal() {
    const billing_address = {
      first_name: this.billing_address_form.value?.first_name,
      last_name: this.billing_address_form.value?.last_name,
      address_1: this.billing_address_form.value?.address_1,
      city: this.billing_address_form.value?.city,
      country_code: this.billing_address_form.value?.country_code,
      postal_code: this.billing_address_form.value?.postal_code,
      phone: this.billing_address_form.value?.phone,
      address_2: this.billing_address_form.value?.address_2
    }
    await this.store.dispatch(new MedusaActions.AddBillingAddress(billing_address));
    await this.modalCtrl.dismiss();
    await this.billing_address_form.reset();
  }
  onRegionCodeChange(regionId: string) {
    if (regionId != null) {
      this.store.dispatch(new MedusaActions.GetCountries(regionId))
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((state) => {
        this.countriesList = state.medusaState.countriesList;
      });
    }
  }
  setupForm() {
    this.billing_address_form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address_1: new FormControl('', Validators.required),
      address_2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
      region_code: new FormControl(''),
      country: new FormControl(''),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  populateEditForm(retrivedCustomer: any) {
    this.billing_address_form.get('id')?.setValue(retrivedCustomer.billing_address?.id);
    this.billing_address_form.get('first_name')?.setValue(retrivedCustomer.billing_address?.first_name);
    this.billing_address_form.get('last_name')?.setValue(retrivedCustomer.billing_address?.last_name);
    this.billing_address_form.get('address_1')?.setValue(retrivedCustomer.billing_address?.address_1);
    this.billing_address_form.get('address_2')?.setValue(retrivedCustomer.billing_address?.address_2);
    this.billing_address_form.get('city')?.setValue(retrivedCustomer.billing_address?.city);
    this.billing_address_form.get('region_code')?.setValue(this.selectedRegion);
    this.billing_address_form.get('country')?.setValue(retrivedCustomer.billing_address?.country_code);
    this.billing_address_form.get('postal_code')?.setValue(retrivedCustomer.billing_address?.postal_code);
    this.billing_address_form.get('phone')?.setValue(retrivedCustomer.billing_address?.phone);
    if (this.selectedRegion != null) {
      this.onRegionCodeChange(this.selectedRegion);
    }
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.billing_address_form.reset();
  }
}
