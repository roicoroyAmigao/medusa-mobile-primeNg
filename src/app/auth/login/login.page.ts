import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { pipe, Subject, takeUntil, timeout } from 'rxjs';
import { LoginFormComponent } from 'src/app/form-components/login-form/login-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ILoginData } from 'src/app/store/state.interfaces';
import { UserActions } from 'src/app/store/user/user.actions';

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
    this.store.dispatch(new UserActions.Login(request))
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((state) => {
        const errorEntry = state.errorsLogging.errorEntry;
        if (errorEntry === null) {
          this.navigation.navigateFlip('/home');
        }
      });
  }
  register(): void {
    this.navigation.navControllerDefault('/auth/register/user');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
