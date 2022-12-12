import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { IRegisterData } from 'src/app/store/state.interfaces';


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
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  @ViewChild('form') form: UserFormComponent;

  public registerReq: IRegisterData;

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
    this.registerReq = this.userForm.value;
    const data: IRegisterData = {
      "first_name": this.registerReq?.first_name,
      "last_name": this.registerReq?.last_name,
      "email": this.registerReq?.email,
      "password": this.userForm.value?.passwordConfirmation,
      "phone": this.registerReq?.phone,
    };
    console.log(data);
    this.submitted = true;

    // this.store.dispatch(new AuthActions.MedusaRegister(data))
    //   .subscribe(async (state) => {
    //     if (state.authState.isLoggedIn && state.authState.customer != null) {
          this.navigation.navigateFlip('/auth/register/address');
    //     }
    //   });
  }
  back() {
    this.navigation.navControllerDefault('/auth/login');
  }
}