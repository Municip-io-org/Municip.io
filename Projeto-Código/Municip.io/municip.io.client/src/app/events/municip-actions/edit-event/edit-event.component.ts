import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Event, EventsService } from '../../../services/events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
  providers: [provideNativeDateAdapter()],
  encapsulation: ViewEncapsulation.None,
})
export class EditEventComponent implements OnInit {

  municipalityImage: string = "";
  municipalityName: string = "";


  error: string | null = null;
  photo!: File;

  imagePreview: string = "";

  eventSelected!: Event;

  isDialogOpen: boolean = false;

  constructor(private dateAdapter: DateAdapter<Date>, private authService: UserAuthService,
    private eventService: EventsService, private route: ActivatedRoute, private router: Router,
  ) {
    // Set the locale to pt in the calendar
    this.dateAdapter.setLocale('pt');

  }


  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
        });
      });

    });
    let eventId = this.route.snapshot.params['eventId'];
    this.eventService.getEventById(eventId).subscribe((event: Event) => {

      if (event) {
        this.eventSelected = event;
        this.eventForm.setValue({
          title: event.title,
          capacity: event.capacity.toString(),
          eventDate: {
            startDate: new Date(event.startDate),
            startHour: format(event.startDate, "HH:mm"),
            endDate: new Date(event.endDate),
            endHour: format(event.endDate, "HH:mm"),
          },
          eventRegistration: {
            startDate: new Date(event.startRegistration),
            startHour: format(event.startRegistration, "HH:mm"),
            endDate: new Date(event.endRegistration),
            endHour: format(event.endRegistration, "HH:mm"),
          },
          local: event.local,
          description: event.description,
          image: ''
        });

        this.imagePreview = event.image || "";
      }
    });


  }



  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1)]),
    eventDate: new FormGroup({
      startDate: new FormControl(new Date(), [Validators.required]),
      startHour: new FormControl('', [Validators.required]),
      endDate: new FormControl(new Date, [Validators.required]),
      endHour: new FormControl('', [Validators.required]),
    }),
    eventRegistration: new FormGroup({
      startDate: new FormControl(new Date, [Validators.required]),
      startHour: new FormControl('', [Validators.required]),
      endDate: new FormControl(new Date, [Validators.required]),
      endHour: new FormControl('', [Validators.required]),
    }),
    local: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    description: new FormControl('', [Validators.required]),

  })



  get title() {
    return this.eventForm.get('title');
  }

  get capacity() {
    return this.eventForm.get('capacity');
  }

  get eventDate() {
    return this.eventForm.get('eventDate') as FormGroup;
  }

  get eventRegistration() {
    return this.eventForm.get('eventRegistration') as FormGroup;
  }

  get startDate() {
    return this.eventDate.get('startDate');
  }

  get startHour() {
    return this.eventDate.get('startHour');
  }

  get endDate() {
    return this.eventDate.get('endDate');
  }

  get endHour() {
    return this.eventDate.get('endHour');
  }

  get startRegistrationDate() {
    return this.eventRegistration.get('startDate');
  }

  get startRegistrationHour() {
    return this.eventRegistration.get('startHour');
  }

  get endRegistrationDate() {
    return this.eventRegistration.get('endDate');
  }

  get endRegistrationHour() {
    return this.eventRegistration.get('endHour');
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
        id: this.eventSelected!.id,
        title: this.title?.value || "",
        capacity: parseInt(this.capacity?.value || "10"),
        startDate: newStartDate,
        endDate: newEndDate,
        startRegistration: newStartRegistrationDate,
        endRegistration: newEndRegistrationDate,
        local: this.local?.value || "",
        description: this.description?.value || "",
        municipality: this.eventSelected.municipality,
        image: this.eventSelected.image,
        nRegistrations: this.eventSelected.nRegistrations,
      }

      this.eventService.updateEvent(newEvent, this.photo).subscribe(
        (event) => {
          this.isDialogOpen = true;
          this.error = null;
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
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Atribui o URL temporário à propriedade emblemPhoto
      };
      reader.readAsDataURL(file);

    } else {
      console.error('No file selected');
    }
  }



  cancel() {
    this.router.navigate(['/events']);
  }



  closeDialog() {
    this.isDialogOpen = false;
  }












}
