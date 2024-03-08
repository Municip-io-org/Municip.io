import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-country-picker',
  templateUrl: './country-picker.component.html',
  styleUrl: './country-picker.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CountryPickerComponent {
  @Input() country!: FormControl;
  get control() {
    return this.country as FormControl;
  }
}
