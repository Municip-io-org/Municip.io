import { Component } from '@angular/core';
import { Book, BookStatus, LibraryService } from '../../services/library/library.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {

  categories: Category[] = [];


  book:Book = {
      id: 1,
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
  coverImage!: File;
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



  openAddGenreDialog() {
    this.isAddGenreDialogOpen = true;

  }

  addGenre(newGenre: string) {
    this.categories.push({ name: newGenre, value: false });
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


  /**
   * Construtor do componente.
   * @param authService
   * @param libraryService
   * @param router
   */
  constructor(private authService: UserAuthService, private libraryService: LibraryService, private router: Router) {

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
          this.categories.push({ name: category, value: false });
          this.genres.push(new FormControl({value: false, disabled: true})); // Por padrão, inicialize todas as categorias desmarcadas
        });
      }
    );
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


  onSubmit(): void {
    if (this.bookForm.valid) {

      this.book = {
        isbn: this.iSBN?.value!.toString() || '',
        title: this.title?.value!,
        author: this.authors?.value!,
        availableCopies: parseInt(this.copies?.value!),
        copies: parseInt(this.copies?.value!),
        coverImage: '',
        edition: this.edition?.value!,
        genre: this.genres?.value
          .map((value: boolean, index: number) => (value ? this.categories[index].name : null))
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
    return this.categories.map(category => category.name);
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
    return this.bookForm.get('publicationDate');
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

interface Category {
  name: string,
  value: boolean
}
