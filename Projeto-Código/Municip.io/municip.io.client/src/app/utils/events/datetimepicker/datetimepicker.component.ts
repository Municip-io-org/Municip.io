import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrl: './datetimepicker.component.css'
})
export class DatetimepickerComponent {
  @Input() titleDate: string = "Data";
  @Input() titleStartHour: string = "Hora de Inicio";
  @Input() titleEndHour: string = "Hora de Fim";
  @Input() StartHourPlaceholder: string = "Início";
  @Input() EndHourPlaceholder: string = "Fim";
  @Input() startDateReceived: FormControl = new FormControl("");
  @Input() startHourReceived: FormControl = new FormControl("");
  @Input() endDateReceived: FormControl = new FormControl("");
  @Input() endHourReceived: FormControl = new FormControl("");

  constructor() {

    this.componentForm.valueChanges.subscribe((value) => {
      this.startDateReceived.setValue(value.startDate);
      this.startHourReceived.setValue(value.startHour);
      this.endDateReceived.setValue(value.endDate);
      this.endHourReceived.setValue(value.endHour);

    });

  }

  componentForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    startHour: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
  });

  //create the get functions for the form group
  get startDate() {
    return this.componentForm.get('startDate');
  }

  get startHour() {
    return this.componentForm.get('startHour');
  }

  get endDate() {
    return this.componentForm.get('endDate');
  }

  get endHour() {
    return this.componentForm.get('endHour');
  }




}
