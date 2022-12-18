import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { UserFormComponent } from 'src/app/form-components/user-form/user-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { IRegisterData } from 'src/app/store/state.interfaces';
import { UserActions } from 'src/app/store/user/user.actions';

export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class UserComponent implements OnInit {
  @ViewChild('form') form: UserFormComponent;

  // public registerReq: IRegisterData;

  userForm: FormGroup | any

  private readonly ngUnsubscribe = new Subject();

  submitted = false;

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
    const data: IRegisterData = {
      first_name: this.userForm.value.user?.first_name,
      last_name: this.userForm.value.user?.last_name,
      email: this.userForm.value.user?.email,
      password: this.userForm.value.user?.passwordConfirmation,
      phone: this.userForm.value.user?.phone,
    };
    // console.log(this.userForm.value.user?.email);
    this.submitted = true;

    this.store.dispatch(new UserActions.MedusaRegister(data))
      .subscribe(async (state) => {
        // this.navigation.navigateFlip('/auth/register/address');
        // if (state.authState.isLoggedIn && state.authState.customer != null) {
        //   this.navigation.navigateFlip('/auth/register/address');
        // }
      });
  }
  back() {
    this.navigation.navControllerDefault('/auth/login');
  }
}
