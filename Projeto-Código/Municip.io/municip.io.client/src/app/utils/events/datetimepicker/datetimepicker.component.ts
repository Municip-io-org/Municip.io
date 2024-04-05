import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrl: './datetimepicker.component.css'
})
export class DatetimepickerComponent implements OnInit {
  @Input() titleDate: string = "Data";
  @Input() titleStartHour: string = "Hora de Inicio";
  @Input() titleEndHour: string = "Hora de Fim";
  @Input() StartHourPlaceholder: string = "Início";
  @Input() EndHourPlaceholder: string = "Fim";
  @Input() formReceived: FormGroup = new FormGroup({});

  @Input() minDate?: Date; 

  componentForm: FormGroup = new FormGroup({});
 

  ngOnInit(): void {

    this.componentForm = this.formReceived;
  }





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
