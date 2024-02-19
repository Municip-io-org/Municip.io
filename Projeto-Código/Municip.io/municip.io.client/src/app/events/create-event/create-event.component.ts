import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../services/events/events.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {


  errors: string[] | null = null;
  photo!: File;

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    startRegistration: new FormControl('', [Validators.required]),
    endRegistration: new FormControl('', [Validators.required]),
    local: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
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

  get startRegistration() {
    return this.eventForm.get('startRegistration');
  }

  get endRegistration() {
    return this.eventForm.get('endRegistration');
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
