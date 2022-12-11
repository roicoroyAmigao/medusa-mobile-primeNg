import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NavigationService } from '../shared/services/navigation.service';
// import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  @ViewChild('form') form: any;

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private navigation: NavigationService,
  ) {
    this.signupForm = this.formBuilder.group({
      password: [],
      profile: [],
      login: [],
      address: []
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  submit() {
    console.log(this.signupForm.value);
    // console.log(this.form);
    this.form.submitAddressForm(this.signupForm);
  }

  resetForm() {
    this.signupForm.reset();
  }

  homePage() {
    this.navigation.navControllerDefault('/home');
  }
}
