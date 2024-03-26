import { Component } from '@angular/core';
import { LibraryService } from '../../services/library/library.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {


  municipalityImage: string = "";
  municipalityName: string = "";


  error: string | null = null;
  coverImage!: File;
  coverImageUrl: string | null = null;
  files: any[] = [];

  isDialogOpen: boolean = false;

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

  /**
   * Construtor do componente.
   * @param authService
   * @param libraryService
   * @param router
   */
  constructor(private authService: UserAuthService, private libraryService: LibraryService, private router: Router) {
  }

  bookForm = new FormGroup({
    iSBN: new FormControl('',),
    title: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    edition: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publicationDate: new FormControl(new Date(), [Validators.required]),
    language: new FormControl('', [Validators.required]),
    copies: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    sinopsis: new FormControl('', [Validators.required]),
  })

  /**
   * Método onInit 
   */
  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
        });
      });
    });
  }




}
