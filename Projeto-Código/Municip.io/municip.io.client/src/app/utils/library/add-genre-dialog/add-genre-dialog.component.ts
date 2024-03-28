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

  @Input() list: string[] = [];
  @Output() newGenre = new EventEmitter<string>();

  genreForm = new FormGroup({
    genre: new FormControl("", [Validators.required, this.validateGenre.bind(this)])
  })

  validateGenre(control: FormControl): { [key: string]: boolean } | null {
    const name = control.value as string;
    const listUpperCase = this.list.map(genre => genre.toUpperCase());
    if (!listUpperCase.includes(name.toUpperCase())) {
      return null; 
    } else {
      return { 'nameInList': true }; 
    }
  }


  closeDialog() {
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(this.isDialogOpen);
  }

  addGenre() {
    this.newGenre.emit(this.genre?.value!);
    this.isDialogOpen = false;
    this.isDialogOpenChange.emit(this.isDialogOpen);
    this.genre?.setValue('');
    this.genre?.markAsUntouched();
  }

  get genre() {
    return this.genreForm.get('genre');
  }

}
