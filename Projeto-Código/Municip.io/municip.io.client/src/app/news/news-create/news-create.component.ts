import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.css'
})
export class NewsCreateComponent {

  news = {
    title: '',
    subtitle: '',
    mainText: '',
    photo: '',
    date: new Date(),
  };

  errors: string[] | null = null;
  image!: File;
  subtitleCharacterCount = 0;
  mainTextCharacterCount =0;

  constructor() { }


  newsCreate = new FormGroup({
    title: new FormControl("", [Validators.required]),
    subtitle: new FormControl("", [Validators.email, Validators.required]),
    mainText: new FormControl("", [Validators.required]),
    photo: new FormControl(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),

  });

  get title() {
    return this.newsCreate.get('title');
  }
  get subtitle() {
    return this.newsCreate.get('subtitle');
  }
  get mainText() {
    return this.newsCreate.get('mainText');
  }
  get imagephoto() {
    return this.newsCreate.get('photo');
  }
  get date() {
    return this.newsCreate.get('date');
  }

  OnSubmit() {
   

     
    
  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      this.image = file;
      
    } else {
      console.error('No file selected');
    }
  }

  updateCharacterCount(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'subtitle') {
      this.subtitleCharacterCount = target.value.length;
    } else if (target.id === 'mainText') {
      this.mainTextCharacterCount = target.value.length;
    }
  }
}
