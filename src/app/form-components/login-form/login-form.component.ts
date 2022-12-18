import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LoginFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup | any;
  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): any {
    return this.loginForm.value;
  }

  set value(value: any) {
    this.loginForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.loginForm.controls.email;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('roicoroy@yahoo.com.br', [Validators.required, Validators.email]),
      password: new FormControl('Rwbento123!', [Validators.required, Validators.minLength(6)]),
    });

    this.subscriptions.push(
      this.loginForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.loginForm.reset();
    }
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  validate(_: FormControl) {
    return this.loginForm.valid ? null : { profile: { valid: false, }, };
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
