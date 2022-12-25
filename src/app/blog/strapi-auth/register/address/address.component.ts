import { Component, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { UtilityService } from "src/app/shared/services/utility.service";
// import { StrapiAddressFacade } from "./address.facade";

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
    // private readonly facade: StrapiAddressFacade,
    private navigation: NavigationService,
    private utility: UtilityService,
  ) {
    // this.viewState$ = this.facade.viewState$;
    // // this.viewState$
    // //   .pipe(
    // //     takeUntil(this.ngUnsubscribe)
    // //   )
    // //   .subscribe((vs: any) => {
    // //     if (vs.customer != null) {
    // //       this.first_name = vs.customer?.first_name;
    // //       this.last_name = vs.customer?.last_name;
    // //     }
    // //   });

    this.adressForm = this.formBuilder.group({
      address:
      {
        address_1: '',
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
      address_1: this.adressForm.get('address').value?.address_1,
      address_2: this.adressForm.get('address').value?.address_2,
      city: this.adressForm.get('address').value?.city,
      region_code: this.adressForm.get('address').value?.region_code,
      country_code: this.adressForm.get('address').value?.country,
      postal_code: this.adressForm.get('address').value?.postal_code,
      phone: this.adressForm.get('address').value?.phone,
    };
    console.log(data);

    // this.store.dispatch(new RegisterActions.UpdateCustomerRegisterAddress(data));

    setTimeout(() => {
      const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
        if (errorEntry === null) {
          this.navigation.navigateFlip('/blog/strapi/news');
          this.utility.dismissLoading();
        }
    }, 200);
  }

  back(): void {
    this.navigation.navigateFlip('/strapi-auth/register/user');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
