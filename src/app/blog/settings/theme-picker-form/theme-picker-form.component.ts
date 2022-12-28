import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Validation from 'src/app/shared/validators/validation';
import { UserFormComponent } from '../../../form-components/user-form/user-form.component';

@Component({
  selector: 'app-theme-picker-form',
  templateUrl: './theme-picker-form.component.html',
  styleUrls: ['./theme-picker-form.component.scss'],
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
export class ThemePickerFormComponent implements ControlValueAccessor, OnDestroy {

  @ViewChild('palette') public palette: ElementRef;

  public color = 'rgba(48, 48, 48, 1)';

  form: FormGroup | any;

  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this.form.value;
  }

  set value(value) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      primary: new FormControl(''),
      secondary: new FormControl(''),
      tertiary: new FormControl(''),
      info: new FormControl(''),
      success: new FormControl(''),
      warning: new FormControl(''),
      danger: new FormControl(''),
      dark: new FormControl(''),
      medium: new FormControl(''),
      light: new FormControl(''),
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public captureColour(event: any): void {
    this.color = event;
    this.palette.nativeElement.style.backgroundColor = this.color;
  }

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
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false, }, };
  }

}
