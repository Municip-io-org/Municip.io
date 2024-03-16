import { Component } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

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
  isDialogOpen: boolean = false;
  editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute,private router :Router, private userAuthService: UserAuthService) { }

  

  newsEditForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    subtitle: new FormControl("", [Validators.email, Validators.required]),
    mainText: new FormControl("", [Validators.required]),
    photo: new FormControl(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit() {
    this.editor = new Editor();
    this.news = this.activatedRoute.snapshot.data['news'];
    console.log("EVENTO SELECIONADO");
    this.newsEditForm.controls['title'].setValue(this.news.title);
    this.newsEditForm.controls['subtitle'].setValue(this.news.subtitle);
    this.newsEditForm.controls['date'].setValue(this.news.date);
    this.newsEditForm.controls['mainText'].setValue(this.news.mainText);
  }

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
        this.isDialogOpen = true;
        this.errors = null;
      
      },
      (error) => {
        console.error(error);
        this.errors = error.error;
      }
    );
  }

  ngDestroy() {
    this.editor.destroy();
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

  closeDialog() {
    this.isDialogOpen = false;

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
