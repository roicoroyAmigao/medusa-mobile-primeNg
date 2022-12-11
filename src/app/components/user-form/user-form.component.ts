import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Validation from 'src/app/shared/validators/validation';
import { ProfileFormComponent, ProfileFormValues } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit,ControlValueAccessor, OnDestroy  {

  userForm: FormGroup | any;
  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };
  
  get value() {
    return this.userForm.value;
  }

  set value(value) {
    this.userForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.userForm.controls.email;
  }

  constructor(
    private formBuilder: FormBuilder
    ) {
    this.userForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required])
    }, { validators: [Validation.match('password', 'passwordConfirmation')] 
    });

    this.subscriptions.push(
      this.userForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.userForm.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.userForm.valid ? null : { profile: { valid: false, }, };
  }
}
