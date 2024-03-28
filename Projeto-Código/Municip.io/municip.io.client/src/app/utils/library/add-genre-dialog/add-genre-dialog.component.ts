import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-genre-dialog',
  templateUrl: './add-genre-dialog.component.html',
  styleUrl: './add-genre-dialog.component.css'
})
export class AddGenreDialogComponent {

  @Input() isDialogOpen: boolean = false;
  @Output() isDialogOpenChange = new EventEmitter<boolean>();

  @Input() list:string[] = [];

  genreForm = new FormGroup({
    genre: new FormControl("", Validators.required)
  })



  closeDialog() {
    console.log("Fechar dialogo");
    this.isDialogOpen = false;
    console.log(this.isDialogOpen);
    this.isDialogOpenChange.emit(this.isDialogOpen);
  }

  addGenre() {
    console.log("Adicionar categoria");
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(this.isDialogOpen);
  }

  get genre() {
    return this.genreForm.get('genre');
  }

}
