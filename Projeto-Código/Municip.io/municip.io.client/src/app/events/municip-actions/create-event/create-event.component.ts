import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event, EventsService } from '../../../services/events/events.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { UserAuthService } from '../../../services/user-auth.service';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  providers: [provideNativeDateAdapter()],
  encapsulation: ViewEncapsulation.None,
})



export class CreateEventComponent implements OnInit {

  constructor(private dateAdapter: DateAdapter<Date>, private authService: UserAuthService,
    private eventService: EventsService
  ) {
    // Set the locale to pt in the calendar
    this.dateAdapter.setLocale('pt');

    this.eventForm.valueChanges.subscribe((value) => {
      console.log(value)
    });


  }
  municipalityImage: string = "";
  municipalityName: string = "";

  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          console.log(municipality)
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
        });
      });

    }
    );
  }



  error: string | null = null;
  photo!: File;

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1)]),
    startDate: new FormControl('', [Validators.required]),
    startHour: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endHour: new FormControl('', [Validators.required]),
    startRegistrationDate: new FormControl('', [Validators.required]),
    startRegistrationHour: new FormControl('', [Validators.required]),
    endRegistrationDate: new FormControl('', [Validators.required]),
    endRegistrationHour: new FormControl('', [Validators.required]),
    local: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  })



  get title() {
    return this.eventForm.get('title');
  }

  get capacity() {
    return this.eventForm.get('capacity');
  }

  get startDate(): FormControl {
    return this.eventForm.get('startDate') as FormControl;
  }

  get endDate() {
    return this.eventForm.get('endDate') as FormControl;
  }

  get startRegistrationDate() {
    return this.eventForm.get('startRegistrationDate') as FormControl;
  }

  get endRegistrationDate() {
    return this.eventForm.get('endRegistrationDate') as FormControl;
  }

  get startHour() {
    return this.eventForm.get('startHour') as FormControl;
  }

  get endHour() {
    return this.eventForm.get('endHour') as FormControl;
  }

  get startRegistrationHour() {
    return this.eventForm.get('startRegistrationHour') as FormControl;
  }

  get endRegistrationHour() {
    return this.eventForm.get('endRegistrationHour') as FormControl;
  }

  get local() {
    return this.eventForm.get('local');
  }

  get image() {
    return this.eventForm.get('image');
  }

  get description() {
    return this.eventForm.get('description');
  }


  OnSubmit() {
    if (this.eventForm.valid) {

      let newStartDate = this.createDateTime(new Date(this.startDate?.value || ""), this.startHour?.value || "");
      let newEndDate = this.createDateTime(new Date(this.endDate?.value || ""), this.endHour?.value || "");
      let newStartRegistrationDate = this.createDateTime(new Date(this.startRegistrationDate?.value || ""), this.startRegistrationHour?.value || "");
      let newEndRegistrationDate = this.createDateTime(new Date(this.endRegistrationDate?.value || ""), this.endRegistrationHour?.value || "");



      const newEvent: Event = {
        title: this.title?.value || "",
        capacity: parseInt(this.capacity?.value || "10"),
        nRegistrations: 0,
        startDate: newStartDate,
        endDate: newEndDate,
        startRegistration: newStartRegistrationDate,
        endRegistration: newEndRegistrationDate,
        local: this.local?.value || "",
        description: this.description?.value || "",
        citizens: [],
        municipality: this.municipalityName
      }

      this.eventService.createEvent(newEvent, this.photo).subscribe(
        (event) => {
          this.error=null;
          console.log(event);
        },
        (error) => {
          console.log(error)
          this.error = error.error.message;
          window.scrollTo(0, 0);
        }
      );
    }

  }


  createDateTime(date: Date, time: string): Date {
    let partTime = time.split(':');
    let startHour = parseInt(partTime[0]);
    let partEndHout = parseInt(partTime[1]);

    let newDate = new Date(date);
    newDate.setHours(startHour);
    newDate.setMinutes(partEndHout);

    return newDate;

  }




  onImagePicked(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0]; // Use optional chaining here

    if (file) {
      this.photo = file;


    } else {
      console.error('No file selected');
    }
  }




}
