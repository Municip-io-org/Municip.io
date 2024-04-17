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

//documentação do componente
/**
 * Componente para edição de um livro.
 *
 * Este componente permite a edição de um livro existente na biblioteca.
 *
 * @param categories - As categorias disponíveis na biblioteca.
 * @param book - O livro a ser editado.
 * @param municipalityImage - A imagem da municipalidade.
 * @param municipalityName - O nome da municipalidade.
 * @param error - A mensagem de erro.
 * @param coverImage - A imagem da capa do livro.
 * @param files - Os arquivos.
 * @param authorsList - A lista de autores.
 * @param isDialogOpen - Indica se o diálogo está aberto.
 * @param dialogTitle - O título do diálogo.
 * @param dialogMessage - A mensagem do diálogo.
 * @param isAddGenreDialogOpen - Indica se o diálogo de adição de gênero está aberto.
 * @param isConfirmDialog - Indica se o diálogo de confirmação está aberto.
 * @param editor - O editor.
 * @param toolbar - A barra de ferramentas.
 * @param bookForm - O formulário do livro.
 * @param authService - O serviço de autenticação do usuário.
 * @param dateAdapter - O adaptador de data.
 * @param libraryService - O serviço da biblioteca.
 * @param router - O roteador.
 * @param activatedRoute - A rota ativa.
 * @param iSBN - O ISBN.
 * @param useISBN - O uso do ISBN.
 * @param title - O título.
 * @param publisher - O editor.
 * @param edition - A edição.
 * @param authors - Os autores.
 * @param publicationDate - A data de publicação.
 * @param language - O idioma.
 * @param copies - As cópias.
 * @param genres - Os gêneros.
 * @param sinopsis - A sinopse.
 * @param coverImageUrl - A URL da imagem da capa.
 *
 *
 * 
 */
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
    copies: new FormControl({ value: "", disabled: false }, [Validators.required, this.copiesValidator.bind(this)]),
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

  /**
   * Método para construir os checkboxes das categorias
   *
   */
  private buildCategoryCheckboxes() {
    this.categories.forEach(category => {
      this.genres.push(new FormControl({ value: false, disabled: false })); // Por padrão, inicialize todas as categorias desmarcadas
    });
  }


  /**
   * Método para inicializar o formulário
   */
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
      }
    });
  }


  /**
   * Método para submeter o formulário
   */
  onSubmit(): void {
    if (this.bookForm.valid) {

      let newAvailableCopies = this.book.availableCopies;
      // Verifica se o número de cópias foi alterado
      if (this.book.copies != parseInt(this.copies?.value!)) {
        if (this.book.copies == this.book.availableCopies) {
          newAvailableCopies = parseInt(this.copies?.value!);
        } else if (this.book.copies > this.book.availableCopies) {
          let difference = parseInt(this.copies?.value!) - this.book.copies
          newAvailableCopies = this.book.availableCopies + difference;
        }
      }




      this.book = {
        id: this.book.id,
        isbn: this.iSBN?.value!.toString(),
        title: this.title?.value!,
        author: this.authors?.value!,
        availableCopies: newAvailableCopies,
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

  /**
   * Método onCoverImagePicked
   *
   * @param event
   */
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


  /**
   * Método isValidImageFile
   *
   * @param file
   */
  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  /**
   * Método onDragOver
   *
   * @param event
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  /**
   * Método onDrop
   *
   * @param event
   */
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

  /**
   * Método openAddGenreDialog
   */
  openAddGenreDialog() {
    this.isAddGenreDialogOpen = true;

  }
  /**
   * Método para adicionar um género de livro
   */
  addGenre(newGenre: string) {
    this.categories.push(newGenre);
    this.genres.push(new FormControl({ value: false, disabled: false }))
  }
  /**
   * Método de remoção de género de livro
   */
  removeGenre() {
    if (this.genres.length > 1) {
      this.genres.removeAt(this.genres.length - 1);
    }
  }
  /**
   * Método para adicionar um autor
   *
   */
  addAuthor() {
    this.authors.push(new FormControl(''));
  }
  /**
   * Método para remover um autor
   *
   */
  removeLastAuthor() {
    if (this.authors.length > 1) {
      this.authors.removeAt(this.authors.length - 1);
    }
  }
  /**
   * Método para fechar o dialog
   *
   */
  closeDialog() {
    this.isDialogOpen = false;
  }

  /**
   * Método para obter os nomes das categorias
   *
   */
  extractCategoryNames(): string[] {
    return this.categories.map(category => category);
  }


  /**
   * Método onDestroy
   *
   */
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


  /**
   * Método para validar o número de cópias
   * @param control o numero de copias
   * @returns a validação
   */
  copiesValidator(control: FormControl): { [key: string]: boolean } | null {


    let minimumCopies = this.book.copies - this.book.availableCopies;
    if (this.book.copies != this.book.availableCopies && control.value < minimumCopies) {
      return { 'minimumCopies': true };
    }
    return null;


  }

}
