import { Component } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Municipality } from '../../services/municipal-admin-auth.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrl: './news-edit.component.css'
})
/**
 * News Edit Component
 *
 * Este componente representa a edição de notícias
 *
 * @param news - Notícia
 * @param user - Utilizador
 * @param newUser - Novo utilizador
 * @param errors - Erros
 * @param image - Imagem
 * @param subtitleCharacterCount - Contagem de caracteres do subtítulo
 * @param mainTextCharacterCount - Contagem de caracteres do texto principal
 * @param isDialogOpen - Diálogo aberto
 * @param editor - Editor
 * @param toolbar - Barra de ferramentas
 */
export class NewsEditComponent {
  news: any;
  user: any;
  newUser: any;
  errors: string[] | null = null;
  image!: File;
  imageUrl: string | null = null;
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

  municipality: Municipality = {
    name: '',
    president: '',
    contact: '',
    description: '',
    areaha: '',
    codigo: '',
    codigopostal: '',
    codigoine: '',
    descpstal: '',
    distrito: '',
    eleitores: '',
    email: '',
    fax: '',
    localidade: '',
    nif: '',
    populacao: '',
    rua: '',
    sitio: '',
    telefone: '',
    emblemPhoto: '',
    landscapePhoto: '',
  };


  /**
 * @constructor
 * NewsEditComponent
 *
 * @param newsService - Serviço de notícias
 * @param activatedRoute - Rota ativada
 * @param router - O Router
 * @param userAuthService - Serviço de autenticação do cidadão
 */
  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute,private router :Router, private userAuthService: UserAuthService) { }

  

  newsEditForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    subtitle: new FormControl("", [Validators.email, Validators.required]),
    mainText: new FormControl("", [Validators.required]),
    photo: new FormControl(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
  });

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit() {
    this.editor = new Editor();
    this.news = this.activatedRoute.snapshot.data['news'];
    console.log("EVENTO SELECIONADO");
    this.newsEditForm.controls['title'].setValue(this.news.title);
    this.newsEditForm.controls['subtitle'].setValue(this.news.subtitle);
    this.newsEditForm.controls['date'].setValue(this.news.date);
    this.newsEditForm.controls['mainText'].setValue(this.news.mainText);
    this.imageUrl = this.news.photo;


    this.userAuthService.getUserData().subscribe(
      res => {
        this.user = res;
        var emailToParse = this.user.email;
        var emailParsed = emailToParse.replace('@', '%40');
        this.userAuthService.getInfoByEmail(emailParsed).subscribe(
          res => {
            this.newUser = res;
            console.log(this.newUser);
            this.userAuthService.getInfoMunicipality(this.newUser.municipality).subscribe(
              (municipalityRes: Municipality) => {
                this.municipality = municipalityRes;

              },
              error => {
                console.error(error);
              });
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

  //Getters
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

  /**
   * onSubmit
   *
   * Submete o formulário
   */
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

  /**
   * ngOnDestroy
   *
   * Destroi o editor
   */
  ngDestroy() {
    this.editor.destroy();
  }


  /**
   * onImagePicked
   *
   * Seleciona a imagem
   *
   * @param event - Evento
   */
  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      this.image = file;

    } else {
      console.error('No file selected');
    }
  }

  /**
   * onFileChange
   *
   * Função que é chamada quando o utilizador seleciona uma imagem
   *
   * @param event - Evento
   */
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

  /**
   * isValidImageFile
   *
   * Verifica se o ficheiro é uma imagem
   *
   * @param file - Ficheiro
   * @returns boolean
   */
  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  /**
   * onDragOver
   *
   * Função que é chamada quando o utilizador arrasta um ficheiro para a área de drop
   *
   * @param event - Evento
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * onDrop
   *
   * Função que é chamada quando o utilizador solta um ficheiro na área de drop
   *
   * @param event - Evento
   */
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

  /**
   * closeDialog
   *
   * Fecha o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
    this.router.navigateByUrl('/news');
  }

  /**
   * updateCharacterCount
   *
   * Atualiza a contagem de caracteres
   *
   * @param event - Evento
   */
  updateCharacterCount(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'subtitle') {
      this.subtitleCharacterCount = target.value.length;
    } else if (target.id === 'mainText') {
      this.mainTextCharacterCount = target.value.length;
    }
  }
}
