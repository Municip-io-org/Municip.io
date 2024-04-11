import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DatePickerComponent {

  @Input() date!: FormControl;
  @Input() name: string = "date";
  @Input() class = "";

  @Input() minDate: Date = new Date(1900, 0, 1);


  get control() {
    return this.date as FormControl;
  }
}
