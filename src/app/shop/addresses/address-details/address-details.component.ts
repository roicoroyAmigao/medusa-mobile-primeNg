import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnInit, OnDestroy {

  @Input() address: any;

  address_form: FormGroup;

  regionsList: any = [];
  countriesList: any = [];
  cart: any;
  medusaClient: any;
  selectedRegion: string;
  isEdit: boolean;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private store: Store,
    private utility: UtilityService,
  ) { }

  ngOnInit() {
    this.setupForm();
    const cartid = this.store.selectSnapshot<any>((state) => state.medusaState.cartId);
    this.store.dispatch(new MedusaActions.GetMedusaCart(cartid));
    this.regionsList = [];
    this.regionsList = this.store.selectSnapshot<any>((state) => state.medusaState.regionList);

    this.selectedRegion = this.store.selectSnapshot<any>((state) => state.medusaState.selectedRegion);
    this.onRegionCodeChange(this.selectedRegion);

    if (this.address !== null) {
      this.populateEditForm();
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }
  async closeModal(status: string) {
    await this.modalCtrl.dismiss(this.address_form.value, status);
  }
  onRegionCodeChange(regionId: string) {
    this.countriesList = [];
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
    this.address_form = this.formBuilder.group({
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
  populateEditForm() {
    this.address_form.get('id')?.setValue(this.address?.id);
    this.address_form.get('first_name')?.setValue(this.address?.first_name);
    this.address_form.get('last_name')?.setValue(this.address?.last_name);
    this.address_form.get('address_1')?.setValue(this.address?.address_1);
    this.address_form.get('address_2')?.setValue(this.address?.address_2);
    this.address_form.get('city')?.setValue(this.address?.city);
    
    const selectedRegion = this.store.selectSnapshot<any>((state) => state.medusaState.selectedRegion);
    this.address_form.get('region_code')?.setValue(selectedRegion);
    
    const shippingCountry = this.store.selectSnapshot<any>((state) => state.medusaState.selectedCountry);
    if (shippingCountry) {
      this.address_form.get('country')?.setValue(shippingCountry);
    }
    this.address_form.get('postal_code')?.setValue(this.address?.postal_code);
    this.address_form.get('phone')?.setValue(this.address?.phone);
    if (selectedRegion != null) {
      this.onRegionCodeChange(selectedRegion);
    }
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.address_form.reset();
  }
}
