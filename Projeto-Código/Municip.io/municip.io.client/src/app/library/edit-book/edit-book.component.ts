import { Component } from '@angular/core';
import { Book, BookStatus, LibraryService } from '../../services/library/library.service';
import { Editor, Toolbar } from 'ngx-editor';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
  providers: [provideNativeDateAdapter()],
})
export class EditBookComponent {
  categories: string[] = [];


  book: Book = {
    id: -1,
    isbn: '',
    title: '',
    author: [],
    availableCopies: 0,
    copies: 0,
    coverImage: '',
    edition: '',
    genre: [],
    language: '',
    publicationDate: new Date(),
    publisher: '',
    sinopsis: '',
    status: BookStatus.Available,
    municipality: ''
  }

  municipalityImage: string = "";
  municipalityName: string = "";


  error: string | null = null;
  coverImage: File | null = null;
  files: any[] = [];

  authorsList: string[] = [];

  isDialogOpen: boolean = false;
  dialogTitle = '';
  dialogMessage = '';
  isAddGenreDialogOpen: boolean = false;
  isConfirmDialog: boolean = true;

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



  bookForm = new FormGroup({
    iSBN: new FormControl({ value: "", disabled: true }, [Validators.pattern(/^\d{10}$|^\d{13}$/)]),
    useISBN: new FormControl(true, [Validators.required]),
    title: new FormControl({ value: "", disabled: false }, [Validators.required]),
    publisher: new FormControl({ value: "", disabled: false }, [Validators.required]),
    edition: new FormControl({ value: "", disabled: false }, [Validators.required]),
    authors: new FormArray([
      new FormControl({ value: "", disabled: false }, Validators.required)
    ]),
    publicationDate: new FormControl({ value: new Date(), disabled: false }, [Validators.required]),
    language: new FormControl({ value: "", disabled: false }, [Validators.required]),
    copies: new FormControl({ value: "", disabled: false }, [Validators.required]),
    genres: new FormArray([], [Validators.required, this.validateGenre.bind(this)]),
    sinopsis: new FormControl({ value: "", disabled: false }, [Validators.required]),
    coverImageUrl: new FormControl({ value: "", disabled: false }, [Validators.required])
  });
    

  validateGenre(controls: FormArray): { [key: string]: boolean } | null {
    if (controls.controls.some(control => control.value)) {
      return null;
    } else {
      return { 'noGenreSelected': true };
    }
  }



  /**
   * Construtor do componente.
   * @param authService
   * @param libraryService
   * @param router
   */
  constructor(private authService: UserAuthService, private dateAdapter: DateAdapter<Date>, private libraryService: LibraryService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.dateAdapter.setLocale('pt');
  }



  /**
   * Método onInit 
   */
  ngOnInit(): void {
    this.book = this.activatedRoute.snapshot.data['book'];
    console.log(this.book);
    this.editor = new Editor();


    this.authService.getUserData().pipe(
      switchMap(user => this.authService.getInfoByEmail(user.email)),
      switchMap(account => this.authService.getInfoMunicipality(account.municipality)),
      switchMap(municipality => {
        this.municipalityImage = municipality.landscapePhoto;
        this.municipalityName = municipality.name;
        return this.libraryService.getDistinctCategoriesByMunicipality(municipality.name);
      })
    ).subscribe(
      (categories: string[]) => {
        this.categories = categories;
        this.buildCategoryCheckboxes();
        this.initializeForm();
      },
      (error) => {
        console.error("Erro ao carregar categorias:", error);
        // Lidar com o erro conforme necessário
      }
    );
  }


  private buildCategoryCheckboxes() {
    this.categories.forEach(category => {
      this.genres.push(new FormControl({ value: false, disabled: false })); // Por padrão, inicialize todas as categorias desmarcadas
    });
  }

  initializeForm(): void {

    this.bookForm.patchValue({
      iSBN: this.book.isbn,
      title: this.book.title,
      publisher: this.book.publisher,
      edition: this.book.edition,
      publicationDate: this.book.publicationDate,
      language: this.book.language,
      copies: this.book.copies.toString(),
      sinopsis: this.book.sinopsis,
      coverImageUrl: this.book.coverImage
    });

    this.authors.clear();
    this.book.author.forEach(author => {
      this.authors.push(new FormControl(author));
    })

    this.book.genre.forEach(genre => {
      const index = this.categories.indexOf(genre);
      if (index !== -1) {
        this.genres.at(index).setValue(true);
      } else {
        console.log(this.categories[1]);
      }
    });
  }


  onSubmit(): void {
    if (this.bookForm.valid) {

      this.book = {
        id: this.book.id,
        isbn: this.iSBN?.value!.toString(),
        title: this.title?.value!,
        author: this.authors?.value!,
        availableCopies: parseInt(this.copies?.value!),
        copies: parseInt(this.copies?.value!),
        coverImage: this.coverImageUrl?.value!,
        edition: this.edition?.value!,
        genre: this.genres?.value
          .map((value: boolean, index: number) => (value ? this.categories[index] : null))
          .filter((genre: string | null) => genre !== null),
        language: this.language?.value!,
        publicationDate: this.publicationDate?.value!,
        publisher: this.publisher?.value!,
        sinopsis: this.sinopsis?.value!,
        status: BookStatus.Available,
        municipality: this.municipalityName
      };


      console.log(this.book);

      this.libraryService.updateBook(this.book, this.coverImage).subscribe(
        response => {
          if (response && response.body) {
            this.dialogTitle = 'Atualizado com sucesso';
            this.dialogMessage = response.body.message;
            this.isConfirmDialog = true;
            this.isDialogOpen = true;
          } else {
            console.error('Resposta inválida do servidor após a remoção do livro:', response);

            this.dialogTitle = 'Erro na atualização do livro';
            this.dialogMessage = response?.body?.message || 'Ocorreu um erro ao processar a resposta do servidor.';
            this.isConfirmDialog = false;
            this.isDialogOpen = true;
          }
        },
        error => {
          console.error('Erro ao atualizar o livro:', error);

          this.dialogTitle = 'Erro na atualização do livro';
          this.dialogMessage = error?.message || 'Ocorreu um erro ao atualizar o livro.';
          this.isConfirmDialog = false;
          this.isDialogOpen = true;
        }
      );
    }
  }


  onCoverImagePicked(event: any) {
    if (this.coverImageUrl?.disabled) return;

    const file: File = event.target.files[0];
    if (file) {
      this.coverImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImageUrl?.setValue(reader.result as string); // Atribui o URL temporário à propriedade coverImageUrl
      };
      reader.readAsDataURL(file); // Lê o conteúdo do arquivo como um URL de dados
    } else {
      console.error('No file selected');
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
    if (this.coverImageUrl?.disabled) return;

    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { // Verifique se file não é null ou undefined
        this.coverImage = file;
        this.coverImageUrl?.setValue(URL.createObjectURL(this.coverImage));

      } else {
        console.error('Por favor, solte uma imagem válida.');
      }
    } else {
      console.error('Nenhuma imagem solta.');
    }
  }


  openAddGenreDialog() {
    this.isAddGenreDialogOpen = true;

  }

  addGenre(newGenre: string) {
    this.categories.push(newGenre);
    this.genres.push(new FormControl({ value: false, disabled: false }))
  }

  removeGenre() {
    if (this.genres.length > 1) {
      this.genres.removeAt(this.genres.length - 1);
    }
  }

  addAuthor() {
    this.authors.push(new FormControl(''));
  }

  removeLastAuthor() {
    if (this.authors.length > 1) {
      this.authors.removeAt(this.authors.length - 1);
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    window.location.reload();
  }

  // Função para ajustar a data para o formato "yyyy-MM-dd"
  setUpDate(date: string): string {
    let parts = date.split('-');
    if (parts.length === 1) {
      date += '-01-01';  // Adiciona o mês e o dia padrão se a data tiver apenas o ano
    } else if (parts.length === 2) {
      date += '-01';     // Adiciona o dia padrão se a data tiver ano e mês
    }
    return date;
  }

  setPublicationDate(bookPublicationDate: string): void {
    const formattedDate = this.setUpDate(bookPublicationDate);
    this.publicationDate?.setValue(formattedDate);
  }

  extractCategoryNames(): string[] {
    return this.categories.map(category => category);
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // Getter para acessar os controles do formulário
  get iSBN() {
    return this.bookForm.get('iSBN');
  }

  get useISBN() {
    return this.bookForm.get('useISBN');
  }

  get title() {
    return this.bookForm.get('title');
  }

  get publisher() {
    return this.bookForm.get('publisher');
  }

  get edition() {
    return this.bookForm.get('edition');
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get publicationDate() {
    return this.bookForm.get('publicationDate') as FormControl;
  }

  get language() {
    return this.bookForm.get('language');
  }

  get copies() {
    return this.bookForm.get('copies');
  }

  get genres() {
    return this.bookForm.get('genres') as FormArray;
  }

  get sinopsis() {
    return this.bookForm.get('sinopsis');
  }

  get coverImageUrl() {
    return this.bookForm.get('coverImageUrl');
  }
}
