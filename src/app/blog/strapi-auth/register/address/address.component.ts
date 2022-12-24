import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store } from "@ngxs/store";
import { MessageService } from "primeng/api";
import { Observable, Subject, takeUntil } from "rxjs";
import { AddressFormComponent } from "src/app/form-components/address-form/address-form.component";
import { fade } from "src/app/shared/animations/animations";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { UtilityService } from "src/app/shared/services/utility.service";
import { CartActions } from "src/app/store/cart/cart.actions";
import { MedusaActions } from "src/app/store/medusa/medusa.actions";
import { RegisterActions } from "src/app/store/register/register.actions";
import { IRegisterAddress } from "src/app/store/state.interfaces";
import { AddressFacade } from "./address.facade";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnDestroy {
  adressForm: FormGroup | any;

  viewState$: Observable<any>;

  first_name: string;
  last_name: string;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private readonly facade: AddressFacade,
    private navigation: NavigationService,
    private utility: UtilityService,
  ) {
    this.viewState$ = this.facade.viewState$;
    this.viewState$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((vs: any) => {
        if (vs.customer != null) {
          this.first_name = vs.customer?.first_name;
          this.last_name = vs.customer?.last_name;
        }
      });

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
    const data = {
      username: '',
      first_name: this?.first_name,
      last_name: this?.last_name,
      address_1: this.adressForm.get('address').value?.address_1,
      address_2: this.adressForm.get('address').value?.address_2,
      city: this.adressForm.get('address').value?.city,
      country_code: this.adressForm.get('address').value?.country,
      postal_code: this.adressForm.get('address').value?.postal_code,
      phone: this.adressForm.get('address').value?.phone,
    };
    console.log(data);

    // this.store.dispatch(new RegisterActions.UpdateCustomerRegisterAddress(data));

    // setTimeout(() => {
    //   const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
    //     if (errorEntry === null) {
    //       // this.store.dispatch(new CartActions.CreateCartWithRegionId(this.adressForm.get('address').value.region_code));
    //       this.navigation.navigateFlip('/checkout/flow/cart-review');
    //       this.utility.dismissLoading();
    //     }
    // }, 200);
  }

  back(): void {
    this.navigation.navigateFlip('/strapi-auth/register/user');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
