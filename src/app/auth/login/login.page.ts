import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { LoginFormComponent } from 'src/app/form-components/login-form/login-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { ICustomerLoginData, IStrapiLoginData } from 'src/app/store/state.interfaces';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';
import { AuthRoutePath } from '../route-path.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @ViewChild('form') form: LoginFormComponent;

  signupForm: FormGroup | any;

  loginReq: IStrapiLoginData;

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
    this.form?.loginForm.get('email').setValue('test@test.com');
    this.form?.loginForm.get('password').setValue('Rwbento123!');
  }

  public async login(): Promise<void> {
    const strapiRequest: IStrapiLoginData = {
      identifier: this.signupForm.value.login?.email,
      password: this.signupForm.value.login?.password
    };
    const medusaRequest: ICustomerLoginData = {
      email: this.signupForm.value.login?.email,
      password: this.signupForm.value.login?.password
    }

    // console.log('request: ', request);
    this.store.dispatch(new StrapiUserActions.StrapiLogin(strapiRequest));
    this.store.dispatch(new CustomerActions.Login(medusaRequest));


    setTimeout(() => {
      const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
      console.log('errorEntry: ', errorEntry);
      if (errorEntry === null) {
        this.navigation.navigateFlip(AuthRoutePath.blog);
      }
    }, 100);
  }
  back(): void {
    this.navigation.navControllerDefault(AuthRoutePath.blog);
  }
  register(): void {
    this.navigation.navControllerDefault(AuthRoutePath.user);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
