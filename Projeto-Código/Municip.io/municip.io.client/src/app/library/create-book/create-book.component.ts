import { Component } from '@angular/core';
import { Book, BookStatus, LibraryService } from '../../services/library/library.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { BookLanguage } from '../../../assets/bookLanguages.enum';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CreateBookComponent {

  categories: string[] = [];


  book: Book = {  
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
  isConfirm: boolean = true;

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
    iSBN: new FormControl('', [Validators.pattern(/^\d{10}$|^\d{13}$/)]),
    useISBN: new FormControl(true, [Validators.required]),
    title: new FormControl({ value: "", disabled: true }, [Validators.required]),
    publisher: new FormControl({ value: "", disabled: true }, [Validators.required]),
    edition: new FormControl({ value: "", disabled: true }, [Validators.required]),
    authors: new FormArray([
      new FormControl({ value: "", disabled: true }, Validators.required)
    ]),
    publicationDate: new FormControl({ value: new Date(), disabled: true }, [Validators.required]),
    language: new FormControl({ value: "", disabled: true }, [Validators.required]),
    copies: new FormControl({ value: "", disabled: true }, [Validators.required]),
    genres: new FormArray([], [Validators.required ,this.validateGenre.bind(this)]),
    sinopsis: new FormControl({ value: "", disabled: true }, [Validators.required]),
    coverImageUrl: new FormControl({ value: "", disabled: true }, [Validators.required])
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
  constructor(private authService: UserAuthService, private dateAdapter: DateAdapter<Date>, private libraryService: LibraryService, private router: Router) {
    this.dateAdapter.setLocale('pt');
  }

 

  /**
   * Método onInit 
   */
  ngOnInit(): void {
    this.editor = new Editor();

    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;


          this.buildCategoryCheckboxes();


        });
      });
    });
  }

  private buildCategoryCheckboxes() {
    this.libraryService.getDistinctCategoriesByMunicipality(this.municipalityName).subscribe(
      (categories: string[]) => {
        categories.forEach(category => {
          this.categories.push(category);
          this.genres.push(new FormControl({value: false, disabled: true})); // Por padrão, inicialize todas as categorias desmarcadas
        });
      }
    );
  }

  onSubmit(): void {
    if (this.bookForm.valid) {

      this.book = {
        isbn: this.iSBN?.value!.toString() || '',
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

      this.libraryService.createBook(this.book, this.coverImage).subscribe(
        (res) => {
          this.dialogTitle = 'Criado com Sucesso';
          this.dialogMessage = `O livro foi criado com sucesso`;
          this.isConfirm = true;
          this.isDialogOpen = true;
        },
        (error) => {
          this.dialogTitle = 'Erro';
          this.dialogMessage = error.error;
          this.isConfirm = false;
          this.isDialogOpen = true;
          window.scrollTo(0, 0);
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
    this.router.navigateByUrl('/library/librarylist');
  }

  onISBNChange() {
    this.toggleControls();
    this.getInfo();
  }

  getInfo() {
    if (this.iSBN?.valid) {

      console.log(this.iSBN?.value);

      this.libraryService.getBookInfoAPI(this.iSBN?.value!.toString()).subscribe(
        (bookRes) => { 
          if (bookRes !== null) {
          
            const book: Book = bookRes[0];
            this.title?.setValue(book.title);
            this.publisher?.setValue(book.publisher);
            this.sinopsis?.setValue(book.sinopsis);
            this.coverImageUrl?.setValue(book.coverImage);  
            this.setLanguage(book.language);
            this.edition?.setValue(book.edition);
            this.setPublicationDate(book.publicationDate.toString());
            this.copies?.setValue(book.copies.toString());
            this.addAuthorsFromBookInfo(book.author);
            this.addGenreFromBookInfo(book.genre);

          } else {
            console.log('Nenhum livro encontrado com o ISBN fornecido.');
          }
        },
        (error) => {
          console.error('Erro ao obter informações do livro:', error);
        }
      );
    }
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

  setLanguage(language: string): void {
    type BookLanguageKeys = keyof typeof BookLanguage;

    const languageCode = language as BookLanguageKeys;

    this.language?.setValue(BookLanguage.hasOwnProperty(languageCode) ? BookLanguage[languageCode] : "Inglês");
  }

  addAuthorsFromBookInfo(authors: string[]) {
    this.authors.clear();
    authors.forEach(author => {
      this.authors.push(new FormControl(author));
    })
  }

  addGenreFromBookInfo(genres: string[]) {
    const categoryNamesUpperCase = this.categories.map(category => category.toUpperCase());

    genres.forEach(genre => {
      const index = categoryNamesUpperCase.indexOf(genre.toUpperCase());

      if (index !== -1) {
        this.genres.at(index).setValue(true);
      } else {
        this.categories.push(genre);
        this.genres.push(new FormControl({ value: true, disabled: false }))
      }

    });
  }


  toggleControls() {
    const useISBN = this.useISBN?.value;
    const iSBNValid = this.iSBN?.valid;

    if (useISBN) {
      this.iSBN?.enable();
      this.disableFormControls();
    } else {
      this.iSBN?.disable();
      this.iSBN?.setValue('');
      this.enableFormControls();
    }

    if (useISBN && iSBNValid) {
      this.enableFormControls();
    }
  }


  enableFormControls() {
    this.title?.enable();
    this.publisher?.enable();
    this.edition?.enable();
    this.enableAuthorsControls();
    this.publicationDate?.enable();
    this.language?.enable();
    this.copies?.enable();
    this.enableGenresControls();
    this.sinopsis?.enable();
    this.coverImageUrl?.enable();
  }

  disableFormControls() {
    this.title?.disable();
    this.publisher?.disable();
    this.edition?.disable();
    this.disableAuthorsControls();
    this.publicationDate?.disable();
    this.language?.disable();
    this.copies?.disable();
    this.disableGenresControls();
    this.sinopsis?.disable();
    this.coverImageUrl?.disable();
  }

  enableGenresControls() {
    this.genres.enable();
    this.genres.controls.forEach(control => {
      control.enable();
    });
  }

  disableGenresControls() {
    this.genres.disable();
    this.genres.controls.forEach(control => {
      control.disable();
    });
  }

  enableAuthorsControls() {
    this.authors.enable();
    this.authors.controls.forEach(control => {
      control.enable();
    });
  }

  disableAuthorsControls() {
    this.authors.disable();
    this.authors.controls.forEach(control => {
      control.disable();
    });
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

  get authors() : FormArray {
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

