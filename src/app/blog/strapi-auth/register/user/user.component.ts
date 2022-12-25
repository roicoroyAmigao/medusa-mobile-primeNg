import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { Subject } from "rxjs";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { IStrapiRegisterData, IStrapiLoginData, IRegisterData, ILoginData } from "src/app/store/state.interfaces";

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
    const medusaRegisterRequest: IRegisterData = {
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
    const medusaLoginRequest: ILoginData = {
      email: this.strapiUserForm.value.user?.email,
      password: this.strapiUserForm.value.user?.passwordConfirmation,
    };

    console.log(strapiRegisterRequest, medusaRegisterRequest, strapiLoginRequest, medusaLoginRequest);

    // if (this.userForm.valid) {
    //   this.store.dispatch(new UserActions.Register(registerRequest))
    //     .pipe(
    //       takeUntil(this.ngUnsubscribe)
    //     )
    //     .subscribe((state) => {
    //       const errorEntry = state.errorsLogging.errorEntry;
    //       if (errorEntry === null) {
    //         this.store.dispatch(new UserActions.Login(loginRequest))
    //           .pipe(
    //             takeUntil(this.ngUnsubscribe)
    //           )
    //           .subscribe((lstate) => {
    //             const errorEntry = lstate.errorsLogging.errorEntry;
    //             if (errorEntry === null) {
    //               this.navigation.navigateFlip('/checkout/flow/medusa-auth/register/address');
    //             }
    //           });
    //       }
    //     });
    // }
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
