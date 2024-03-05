import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent {

  @Input() date!: FormControl;
  @Input() name: string = "date";


  get control() {
    return this.date as FormControl;
  }
}
