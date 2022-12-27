import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
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
export class ProfilePage implements OnInit {
  strapiProfileForm: FormGroup;

  avatar: string;

  strapiUser: any;

  viewState$: Observable<any>;

  constructor(
    private strapi: StrapiService,
    private store: Store,
    private navigation: NavigationService,
    private auth: AppAuthService,
    private facade: ProfileFacade,
    private formBuilder: FormBuilder,
  ) {
    this.strapiProfileForm = this.formBuilder.group({
      email: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required,
      ])),
      first_name: new FormControl({ value: '', disabled: false }, Validators.required),
      last_name: new FormControl({ value: '', disabled: false }, Validators.required),
      phone: new FormControl({ value: '', disabled: false }, Validators.required),
      avatar: new FormControl(),
    });

    this.viewState$ = this.facade.viewState$;
    this.viewState$
      .subscribe((vs) => {
        console.log(vs.user);
        console.log(vs.customer);

        // this.avatar = 'assets/shapes.svg';
        this.avatar = !vs.user.avatar?.url ? 'assets/shapes.svg' : vs.user.avatar?.url;
        console.log(vs.user.avatar?.url);

        const username = vs.customer.username !== null ? vs.customer.username : vs.user.username;
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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.store.dispatch(new StrapiUserActions.GetStrapiLoggedIn());
    // this.avatar = 'assets/shapes.svg';
    // this.strapiUser = this.store.selectSnapshot<any>((state) => state.strapiUser.user);
    // console.log(this.strapiUser);
  }

  getStrapiLoggedInAction() {
    this.store.dispatch(new StrapiUserActions.GetStrapiUser());
  }
  submitForm() {
    console.log(this.strapiProfileForm.value);
  }
  async onImagePicked(file: any) {
    // this.upload.onImagePicked(file, this.strapiUser);
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    this.uploadData(formData);
  }

  async uploadData(formData: any) {
    this.store.dispatch(new StrapiUserActions.UploadProfileImage(formData));
    // this.strapi.uploadData(formData).subscribe((response: any) => {
    //   if (response) {
    //     const fileId = response[0].id;
    //     // console.log(response, fileId);
    //     this.strapi.setProfileImage(this.strapiUser?.id, fileId)
    //       .subscribe((user: any) => {
    //         console.log(user);
    //       });
    //   }
    // });
  }

}
