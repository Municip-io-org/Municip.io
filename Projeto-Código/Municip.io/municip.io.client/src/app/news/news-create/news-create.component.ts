import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { News, NewsService } from '../../services/news/news.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.css',
})
export class NewsCreateComponent {

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
  news = {
    title: '',
    subtitle: '',
    mainText: '',
    photo: '',
    date: new Date(),
    municipality: ''
  };
  user: any;
  newUser: any;
  errors: string[] | null = null;
  image!: File;
  imageUrl: string | null = null;
  files: any[] = [];
  subtitleCharacterCount = 0;
  mainTextCharacterCount = 0;

  isDialogOpen: boolean = false;

  constructor(private newsService: NewsService, private router: Router, private userAuthService: UserAuthService ) { }

  ngOnInit() {
    this.editor = new Editor();
    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        var emailToParse = this.user.email;
        var emailParsed = emailToParse.replace('@', '%40');
        this.userAuthService.getInfoByEmail(emailParsed).subscribe(
          res => {
            this.newUser = res;
            console.log(this.newUser);
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
    }

    
  newsCreateForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    subtitle: new FormControl("", [Validators.required]),
    mainText: new FormControl("", [Validators.required]),  
  });

  get title() {
    return this.newsCreateForm.get('title');
  }
  get subtitle() {
    return this.newsCreateForm.get('subtitle');
  }
  get mainText() {
    return this.newsCreateForm.get('mainText');
  }

  ngDestroy() {
    this.editor.destroy();
  }

  OnSubmit() {
   
    this.news.municipality = this.newUser.municipality;
   
    this.news.title = this.newsCreateForm.value.title || "";
    this.news.subtitle = this.newsCreateForm.value.subtitle || "";
    this.news.mainText =  this.newsCreateForm.value.mainText || "";
 
    this.newsService.createNews(this.news as News,this.image).subscribe(
      res => {
        console.log(res);
       this.router.navigateByUrl('/news');
      },
      (error) => {
        console.log(this.news);
        console.log("erro " + error.error.errors)
        this.errors = error.error.errors;
      }
     
    );
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput?.files;

    if (fileList && fileList.length > 0) {
      this.image = fileList[0];
      this.imageUrl = URL.createObjectURL(this.image);

      console.log("ON FILE CHANGE");
    } else {
      console.error('Nenhuma imagem selecionada');
    }
  }




  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { // Verifique se file não é null ou undefined
        this.image = file;
        this.imageUrl = URL.createObjectURL(this.image);
        console.log("ON DROP CHANGE");
      } else {
        console.error('Por favor, solte uma imagem válida.');
      }
    } else {
      console.error('Nenhuma imagem solta.');
    }
  }


 

  closeDialog() {
    this.isDialogOpen = false;
    this.router.navigate(['/news']);
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
