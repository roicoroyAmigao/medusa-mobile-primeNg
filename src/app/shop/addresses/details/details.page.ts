import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @ViewChild('form') form: any;

  addressForm: FormGroup;

  regionsList: any = [];
  countriesList: any = [];
  selectedRegion: string;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private navigation: NavigationService,
    private formBuilder: FormBuilder,
    private store: Store,
    private utility: UtilityService,
  ) {
    this.addressForm = this.formBuilder.group({
      address: [],
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // console.log(this.addressForm);
  }

  ionViewDidEnter() {
    // console.log(this.form);
    // this.form?.adressForm.get('address_1').setValue('test');
  }

  async navigateBack() {
    await this.navigation.navigateFlip('/shop/addresses');
  }
}
