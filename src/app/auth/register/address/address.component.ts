import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store } from "@ngxs/store";
import { MessageService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { AddressFormComponent } from "src/app/form-components/address-form/address-form.component";
import { fade } from "src/app/shared/animations/animations";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { UtilityService } from "src/app/shared/services/utility.service";
import { RegisterActions } from "src/app/store/register/register.actions";
import { IRegisterAddress } from "src/app/store/state.interfaces";
import { RegisterFacade } from "../register.facade";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [MessageService],
  styles: [`

  `],
  animations: [fade()],
})
export class AddressComponent implements OnDestroy {
  @ViewChild('form') form: AddressFormComponent;

  adressForm: FormGroup | any;

  viewState$: Observable<any>;
  first_name: string;
  last_name: string;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private readonly facade: RegisterFacade,
    private navigation: NavigationService,
    private utility: UtilityService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs: any) => {
    //   // console.log(vs.customer.first_name);
    //   // console.log(vs.customer.last_name);
    //   this.first_name = vs.customer?.first_name;
    //   this.last_name = vs.customer?.last_name;
    // });

    this.adressForm = this.formBuilder.group({
      address:
      {
        address_1: 'aa',
        address_2: '',
        region_code: '',
        country: '',
        city: '',
        postal_code: '',
        phone: '',
      },
    });
  }

  updateCustomerAddress() {
    this.utility.presentLoading('...');
    const data: IRegisterAddress = {
      first_name: this?.first_name,
      last_name: this?.last_name,
      address_1: this.adressForm.get('address').value?.address_1,
      address_2: this.adressForm.get('address').value?.address_2,
      city: this.adressForm.get('address').value?.city,
      country_code: this.adressForm.get('address').value?.country,
      postal_code: this.adressForm.get('address').value?.postal_code,
      phone: this.adressForm.get('address').value?.phone,
      company: 'Wyman LLC',
      province: 'Georgia',
      metadata: {}
    };
    // console.log(data);
    // console.log(this.adressForm.get('address').value.region_code);
    this.store.dispatch(new RegisterActions.UpdateCustomerRegisterAddress(data));
    // this.store.dispatch(new MedusaActions.CreateCartWithRegionId(this.adressForm.get('address').value.region_code));
    setTimeout(() => {
      this.navigation.navControllerDefault('/home');
      this.utility.dismissLoading();
    }, 200);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
    // const data: IRegisterAddress = {
    //   address_1: this.adressForm.value.address?.address_1,
    //   address_2: this.adressForm.value.address?.address_2,
    //   region_code: this.adressForm.value.address?.region_code?.id,
    //   country_code: this.adressForm.value.address?.country?.iso_2,
    //   city: this.adressForm.value.address?.city,
    //   postal_code: this.adressForm.value.address?.postal_code,
    //   phone: this.adressForm.value.address?.phone,
    // };