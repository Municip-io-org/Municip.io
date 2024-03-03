import { Component } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrl: './news-edit.component.css'
})
export class NewsEditComponent {
  news: any;
  user: any;
  newUser: any;
  errors: string[] | null = null;
  image!: File;
  subtitleCharacterCount = 0;
  mainTextCharacterCount = 0;

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute, private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.news = this.activatedRoute.snapshot.data['news'];
    console.log("EVENTO SELECIONADO");

  }

  newsEditForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    subtitle: new FormControl("", [Validators.email, Validators.required]),
    mainText: new FormControl("", [Validators.required]),
    photo: new FormControl(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
  });


  get title() {
    return this.newsEditForm.get('title');
  }
  get subtitle() {
    return this.newsEditForm.get('subtitle');
  }
  get mainText() {
    return this.newsEditForm.get('mainText');
  }
  get photo() {
    return this.newsEditForm.get('photo');
  }
  get date() {
    return this.newsEditForm.get('date');
  }

  OnSubmit() {
    this.news.date = new Date();
    if (this.image != null)
    {
      this.news.photo = this.image;
    }
    this.newsService.updateNews(this.news, this.news.photo).subscribe(
      (news) => {
        console.log(news);
        this.errors = null;
      },
      (error) => {
        console.error(error);
        this.errors = error.error;
      }
    );

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
