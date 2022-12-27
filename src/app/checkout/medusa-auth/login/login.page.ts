import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { pipe, Subject, takeUntil, timeout } from 'rxjs';
import { LoginFormComponent } from 'src/app/form-components/login-form/login-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { ICustomerLoginData } from 'src/app/store/state.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @ViewChild('form') form: LoginFormComponent;

  signupForm: FormGroup | any;

  loginReq: ICustomerLoginData;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      login: [],
    });
  }

  ionViewDidEnter() {
    this.form?.loginForm.get('email').setValue('roicoroy@yahoo.com.br');
    this.form?.loginForm.get('password').setValue('Rwbento123!');
  }

  public login(): void {
    const request: ICustomerLoginData = {
      email: this.signupForm.value.login?.email,
      password: this.signupForm.value.login?.password
    }
    this.store.dispatch(new CustomerActions.Login(request))
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((state) => {
        const errorEntry = state.errorsLogging.errorEntry;
        setTimeout(() => {
          if (errorEntry === null) {
            this.navigation.navigateFlip('/checkout/flow/cart-review');
            // console.log('State: ', errorEntry);
          }
        }, 50);
      });
  }
  home(): void {
    this.navigation.navControllerDefault('/checkout/flow/start');
  }
  register(): void {
    this.navigation.navControllerDefault('/auth/register/user');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
