import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../services/events/events.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { UserAuthService } from '../../services/user-auth.service';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  providers: [provideNativeDateAdapter()],
  encapsulation: ViewEncapsulation.None,
})



export class CreateEventComponent implements OnInit {

  constructor(private dateAdapter: DateAdapter<Date>, private authService: UserAuthService) {
    // Set the locale to pt in the calendar
    this.dateAdapter.setLocale('pt');

    this.eventForm.valueChanges.subscribe((value) => {
      console.log(value)
    });


  }
  municipalityImage: string = "";

  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          console.log(municipality)
          this.municipalityImage = municipality.landscapePhoto;
        });
      });

    }
    );
  }



  errors: string[] | null = null;
  photo!: File;

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(10)]),
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

  get startDate() {
    return this.eventForm.get('startDate');
  }

  get endDate() {
    return this.eventForm.get('endDate');
  }

  get startRegistrationDate() {
    return this.eventForm.get('startRegistrationDate');
  }

  get endRegistrationDate() {
    return this.eventForm.get('endRegistrationDate');
  }

  get startHour() {
    return this.eventForm.get('startHour');
  }

  get endHour() {
    return this.eventForm.get('endHour');
  }

  get startRegistrationHour() {
    return this.eventForm.get('startRegistrationHour');
  }

  get endRegistrationHour() {
    return this.eventForm.get('endRegistrationHour');
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
    console.log("asjnjk")
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
