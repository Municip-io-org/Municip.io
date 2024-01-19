import { Component,forwardRef,OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrl: './show-hide-password.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ShowHidePasswordComponent),
    multi: true,
  },
  ],
})
export class ShowHidePasswordComponent implements ControlValueAccessor,OnInit{
  private onChange: any = () => { };
  private onTouched: any = () => { };

  writeValue(value: any): void {
    this.password = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }
  public showPassword: boolean | undefined;
  password: string | undefined;

  show = false;

  ngOnInit() {
    this.password = 'password';
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
