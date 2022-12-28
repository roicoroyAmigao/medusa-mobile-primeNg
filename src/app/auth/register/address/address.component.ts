import { Component, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable, Subject, takeUntil } from "rxjs";
import { CustomerRegisterActions } from "src/app/store/customer-register/customer-register.actions";
import { IRegisterAddress } from "projects/types/types.interfaces";
import { AuthRoutePath } from "../../route-path.enum";
import { StrapiAddressFacade } from "./strapi-address.facade";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { UtilityService } from "projects/services/src/lib/services/utility.service";

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
    private readonly facade: StrapiAddressFacade,
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
    const registerAddress: IRegisterAddress = {
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
    console.log(registerAddress);

    this.store.dispatch(new CustomerRegisterActions.UpdateCustomerRegisterAddress(registerAddress));

    setTimeout(() => {
      const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
      if (errorEntry === null) {
        this.navigation.navigateFlip(AuthRoutePath.blog);
        this.utility.dismissLoading();
      } else {
        this.utility.dismissLoading();
      }
    }, 2000);
  }

  back(): void {
    this.navigation.navigateFlip(AuthRoutePath.user);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
