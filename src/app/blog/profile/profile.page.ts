import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AppAuthService } from 'src/app/shared/services/auth.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';
import { ProfileFacade } from './profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  strapiProfileForm: FormGroup;

  avatar: string;

  strapiUser: any;

  viewState$: Observable<any>;

  private readonly ngUnsubscribe = new Subject();

  formData: FormData;

  constructor(
    private strapi: StrapiService,
    private store: Store,
    private navigation: NavigationService,
    private auth: AppAuthService,
    private facade: ProfileFacade,
    private formBuilder: FormBuilder,
  ) {
    this.strapiProfileForm = this.formBuilder.group({
      username: new FormControl(),
      email: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required,
      ])),
      first_name: new FormControl({ value: '', disabled: false }, Validators.required),
      last_name: new FormControl({ value: '', disabled: false }, Validators.required),
      phone: new FormControl({ value: '', disabled: false }, Validators.required),
    });

    this.viewState$ = this.facade.viewState$;
  }
  ngOnInit() {
    this.viewState$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(() => {
          this.avatar = '';
        })
      ).subscribe((vs) => {
        // console.log(vs.avatar);
        this.avatar = !vs?.user ? 'assets/shapes.svg' : vs.user.avatar?.url;
        // console.log(this.avatar);
        const username = vs.user.username;
        this.strapiProfileForm.get('username')?.setValue(username);
        const email = vs.customer.email !== null ? vs.customer.email : vs.user.email;
        this.strapiProfileForm.get('email')?.setValue(email);
        const first_name = vs.customer.first_name !== null ? vs.customer.first_name : vs.user.first_name;
        this.strapiProfileForm.get('first_name')?.setValue(first_name);
        const last_name = vs.customer.last_name !== null ? vs.customer.last_name : vs.user.last_name;
        this.strapiProfileForm.get('last_name')?.setValue(last_name);
        const phone = vs.customer.phone !== null ? vs.customer.phone : vs.user.phone;
        this.strapiProfileForm.get('phone')?.setValue(phone);
      });
  }
  submitForm() {
    this.store.dispatch(new StrapiUserActions.UpdateStrapiUser(this.strapiProfileForm.value));
  }
  async onImagePicked(file: any) {
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    this.formData = formData;
    return this.formData;
    // this.uploadData(formData);
  }
  async uploadData() {
    this.store.dispatch(new StrapiUserActions.UploadProfileImage(this.formData));
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // this.ngUnsubscribe.next(null);
    // this.ngUnsubscribe.complete();
  }
}
