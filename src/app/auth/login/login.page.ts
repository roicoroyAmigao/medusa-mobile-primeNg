import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { ILoginData } from 'src/app/store/state.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @ViewChild('form') form: LoginFormComponent;

  signupForm: FormGroup | any;

  loginReq: ILoginData;

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

  submitForm() {
    console.log(this.signupForm.value.login);
  }

  public login(): void {
    const request: ILoginData = {
      email: this.signupForm.value.login?.email,
      password: this.signupForm.value.login?.password
    }
    console.log(request);
    this.store.dispatch(new AuthActions.MedusaLogin(request))
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((state) => {
        if (state) {
          this.navigation.navigateForward('/home', 'forward');
        }
      });
  }

  back(): void {
    this.navigation.navControllerDefault('/home');
  }
  register(): void {
    this.navigation.navControllerDefault('/auth/register/user');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
