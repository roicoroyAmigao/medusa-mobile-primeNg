import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { Subject } from "rxjs";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { CustomerActions } from "src/app/store/customer/customer.actions";
import { IStrapiRegisterData, IStrapiLoginData, ICustomerLoginData, ICustomerRegisterData } from "src/app/store/state.interfaces";
import { StrapiUserActions } from "src/app/store/strapi-user/strapi-user.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, OnDestroy {

  strapiUserForm: FormGroup | any;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected router: Router,
    protected translate: TranslateService,
    private store: Store,
    private navigation: NavigationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.strapiUserForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      user: []
    });
  }

  register(): void {
    const strapiRegisterRequest: IStrapiRegisterData = {
      username: this.strapiUserForm.value.username,
      first_name: this.strapiUserForm.value.user?.first_name,
      last_name: this.strapiUserForm.value.user?.last_name,
      email: this.strapiUserForm.value.user?.email,
      password: this.strapiUserForm.value.user?.passwordConfirmation,
      phone: this.strapiUserForm.value.user?.phone,
    };
    const customerRegisterRequest: ICustomerRegisterData = {
      first_name: this.strapiUserForm.value.user?.first_name,
      last_name: this.strapiUserForm.value.user?.last_name,
      email: this.strapiUserForm.value.user?.email,
      password: this.strapiUserForm.value.user?.passwordConfirmation,
      phone: this.strapiUserForm.value.user?.phone,
    };
    const strapiLoginRequest: IStrapiLoginData = {
      identifier: this.strapiUserForm.value.user?.email,
      password: this.strapiUserForm.value.user?.passwordConfirmation,
    };
    const medusaLoginRequest: ICustomerLoginData = {
      email: this.strapiUserForm.value.user?.email,
      password: this.strapiUserForm.value.user?.passwordConfirmation,
    };

    if (this.strapiUserForm.valid) {
      this.store.dispatch(new StrapiUserActions.StrapiRegister(strapiRegisterRequest));
      this.store.dispatch(new CustomerActions.Register(customerRegisterRequest));

      setTimeout(() => {
        this.store.dispatch(new StrapiUserActions.StrapiLogin(strapiLoginRequest));
        this.store.dispatch(new CustomerActions.Login(medusaLoginRequest));
        const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
        // console.log('errorEntry: ', errorEntry);
        if (errorEntry === null) {
          this.address();
        }
      }, 100);
    }
  }
  address() {
    this.navigation.navControllerDefault('/strapi-auth/register/address');
  }
  back() {
    this.navigation.navControllerDefault('/strapi-auth/login');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
