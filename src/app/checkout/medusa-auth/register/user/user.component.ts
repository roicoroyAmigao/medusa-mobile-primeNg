import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ILoginData, IRegisterData } from 'src/app/store/state.interfaces';
import { UserActions } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class UserComponent implements OnInit, OnDestroy {

  userForm: FormGroup | any;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected router: Router,
    protected translate: TranslateService,
    private store: Store,
    private navigation: NavigationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      user: []
    });
  }

  register(): void {
    const registerRequest: IRegisterData = {
      first_name: this.userForm.value.user?.first_name,
      last_name: this.userForm.value.user?.last_name,
      email: this.userForm.value.user?.email,
      password: this.userForm.value.user?.passwordConfirmation,
      phone: this.userForm.value.user?.phone,
    };
    const loginRequest: ILoginData = {
      email: this.userForm.value.user?.email,
      password: this.userForm.value.user?.passwordConfirmation,
    }
    if (this.userForm.valid) {
      this.store.dispatch(new UserActions.Register(registerRequest))
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((state) => {
          const errorEntry = state.errorsLogging.errorEntry;
          if (errorEntry === null) {
            this.store.dispatch(new UserActions.Login(loginRequest))
              .pipe(
                takeUntil(this.ngUnsubscribe)
              )
              .subscribe((lstate) => {
                const errorEntry = lstate.errorsLogging.errorEntry;
                if (errorEntry === null) {
                  this.navigation.navigateFlip('/checkout/flow/medusa-auth/register/address');
                }
              });
          }
        });
    }
  }
  back() {
    this.navigation.navControllerDefault('/checkout/flow/start');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
