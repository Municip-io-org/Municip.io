import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
/**
 * Componente de range para data e hora
 */
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

  minStartHour: string = "0:0";
  minEndHour: string = "0:0";

  componentForm: FormGroup = new FormGroup({});

  /**
   * Método de inicialização do componente
   */
  ngOnInit(): void {
    this.componentForm = this.formReceived;

    this.endHour.setValidators([Validators.required, this.validateHour.bind(this)]);


    this.componentForm.valueChanges.subscribe((value) => {
      if (value.startDate  && value.endDate && value.endDate.getTime() == value.startDate.getTime()) {
        let startHour = value.startHour.split(':');
        let hour = parseInt(startHour[0]);
        let minute = parseInt(startHour[1]);


        this.endHour.updateValueAndValidity({ onlySelf: true, emitEvent: false });


        if (hour >= 24 || minute + 1 >= 60) {
          this.minEndHour = "0:0";
          return;
        }
        this.minEndHour = `${hour}:${minute + 1}`;
      } else {
        this.minEndHour = "0:0";
      }
    });
  }

  get startDate() {
    return this.componentForm.get('startDate') as FormControl;
  }

  get startHour() {
    return this.componentForm.get('startHour') as FormControl;
  }

  get endDate() {
    return this.componentForm.get('endDate') as FormControl;
  }

  get endHour() {
    return this.componentForm.get('endHour') as FormControl;
  }

  /**
   * Valida se a hora de fim é maior que a hora de início
   * @param control
   * @returns
   */
  validateHour(control: FormControl): { [key: string]: any } | null {
    const startHour = this.startHour.value;
    const endHour = control.value;

    if (this.startDate.value && this.endDate.value && this.startDate.value.getTime() == this.endDate.value.getTime()) {


      if (startHour && endHour) {
        const startHourParts = startHour.split(':');
        const endHourParts = endHour.split(':');

        const startHourValue = parseInt(startHourParts[0]) * 60 + parseInt(startHourParts[1]);
        const endHourValue = parseInt(endHourParts[0]) * 60 + parseInt(endHourParts[1]);


        if (endHourValue <= startHourValue) {
          return { endHourLessThanStartHour: true };
        }
      }
    }
    return null;
  }
}
