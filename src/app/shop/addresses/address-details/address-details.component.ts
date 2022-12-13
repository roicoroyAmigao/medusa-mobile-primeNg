import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { IRegisterAddress } from 'src/app/store/state.interfaces';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: AddressFormComponent;

  @Input() address: any;

  addressForm: FormGroup;
  isEdit: boolean;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.addressForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      address: [],
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log(this.address);

    this.isEdit = this.address == null ? true : false;
    return this.isEdit ? null : this.populateEditForm();
    // this.populateEditForm();
  }
  async closeModal(status: string) {

    const addressData: IRegisterAddress = {
      id: this.address.id,
      last_name: this.addressForm.get('first_name')?.value,
      first_name: this.addressForm.get('last_name')?.value,
      address_1: this.addressForm.value.address.address_1,
      address_2: this.addressForm.value.address.address_2,
      country_code: this.addressForm.value.address.country.iso_2,
      city: this.addressForm.value.address.city,
      postal_code: this.addressForm.value.address.postal_code,
      phone: this.addressForm.value.address.phone,
    }
    console.log(addressData);
    await this.modalCtrl.dismiss(addressData, status);
  }

  populateEditForm() {
    // this.form?.adressForm.get('address_1').setValue('test');
    // console.log(this.addressForm.value.address);
    // this.address_form.get('id')?.setValue(this.address?.id);

    this.addressForm.get('first_name')?.setValue(this.address?.first_name);
    this.addressForm.get('last_name')?.setValue(this.address?.last_name);
    this.form?.adressForm.get('address_1')?.setValue(this.address?.address_1);
    this.form?.adressForm.get('address_2')?.setValue(this.address?.address_2);
    this.form?.adressForm.get('country')?.setValue(this.address.country_code);
    this.form?.adressForm.get('city')?.setValue(this.address?.city);
    this.form?.adressForm.get('postal_code')?.setValue(this.address?.postal_code);
    this.form?.adressForm.get('phone')?.setValue(this.address?.phone);

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.addressForm.reset();
  }
}
