import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event as AppEvent, EventsService } from '../../../services/events/events.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';


/**
 * Componente responsável por criar um evento.
 */
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  providers: [provideNativeDateAdapter()],
  encapsulation: ViewEncapsulation.None,
})


/**
 * @class CreateEventComponent
 * Componente responsável por criar um evento.
 *
 * @param municipalityImage - A imagem do município.
 * @param municipalityName - O nome do município.
 * @param error - O erro.
 * @param image - A imagem.
 * @param imageUrl - A URL da imagem.
 * @param files - Os ficheiros.
 * @param isDialogOpen - O estado do dialog.
 * @param editor - O editor.
 * @param toolbar - A barra de ferramentas.
 * @param minDateRegistration - A data mínima de registo.
 * @param minDateEvent - A data mínima do evento.
 * 
 */
export class CreateEventComponent implements OnInit {

  municipalityImage: string = "";
  municipalityName: string = "";


  error: string | null = null;
  image!: File;
  imageUrl: string | null = null;
  files: any[] = [];

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

  minDateRegistration: Date = new Date();
  minDateEvent: Date = new Date();


  /**
   * Construtor do componente.
   * @param dateAdapter
   * @param authService
   * @param eventService
   * @param router
   */
  constructor(private dateAdapter: DateAdapter<Date>, private authService: UserAuthService,
    private eventService: EventsService, private router: Router,
  ) {
    // Set the locale to pt in the calendar
    this.dateAdapter.setLocale('pt');
  }

  /**
   * Método onInit 
   */
  ngOnInit(): void {
    this.minDateRegistration.setDate(new Date().getDate() - 2);
    this.minDateEvent.setDate(this.minDateRegistration.getDate() + 1);

    this.editor = new Editor();
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
        });
      });

    });

    //when the user changes de end date of registration, the start date of the event should be updated
    this.eventForm.get('eventRegistration')?.valueChanges.subscribe((value) => {
      if (value.endDate) {

        this.minDateEvent = new Date(value.endDate);
        this.minDateEvent.setDate(this.minDateEvent.getDate() + 1);
      }
    })

  }

  /**
   * Método OnDestroy
   */
  ngDestroy() {
    this.editor.destroy();
  }


  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1)]),
    eventDate: new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      startHour: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      endHour: new FormControl('', [Validators.required]),
    }),
    eventRegistration: new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      startHour: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      endHour: new FormControl('', [Validators.required]),
    }),
    local: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  })

  // Getters
  get title() {
    return this.eventForm.get('title');
  }

  get capacity() {
    return this.eventForm.get('capacity');
  }

  get eventDate() {
    return this.eventForm.get('eventDate') as FormGroup;
  }

  get eventRegistration() {
    return this.eventForm.get('eventRegistration') as FormGroup;
  }

  get startDate() {
    return this.eventDate.get('startDate');
  }

  get startHour() {
    return this.eventDate.get('startHour');
  }

  get endDate() {
    return this.eventDate.get('endDate');
  }

  get endHour() {
    return this.eventDate.get('endHour');
  }

  get startRegistrationDate() {
    return this.eventRegistration.get('startDate');
  }

  get startRegistrationHour() {
    return this.eventRegistration.get('startHour');
  }

  get endRegistrationDate() {
    return this.eventRegistration.get('endDate');
  }

  get endRegistrationHour() {
    return this.eventRegistration.get('endHour');
  }

  get local() {
    return this.eventForm.get('local');
  }

  get description() {
    return this.eventForm.get('description');
  }

  /**
   *  Método Responsável pela submição do formulário
   */
  OnSubmit() {
    if (this.eventForm.valid) {

      let newStartDate = this.createDateTime(new Date(this.startDate?.value || ""), this.startHour?.value || "");
      let newEndDate = this.createDateTime(new Date(this.endDate?.value || ""), this.endHour?.value || "");
      let newStartRegistrationDate = this.createDateTime(new Date(this.startRegistrationDate?.value || ""), this.startRegistrationHour?.value || "");
      let newEndRegistrationDate = this.createDateTime(new Date(this.endRegistrationDate?.value || ""), this.endRegistrationHour?.value || "");


      
      newStartDate = this.updateDateTimeWithOffSet(newStartDate);
      newEndDate = this.updateDateTimeWithOffSet(newEndDate);
      newStartRegistrationDate = this.updateDateTimeWithOffSet(newStartRegistrationDate);
      newEndRegistrationDate = this.updateDateTimeWithOffSet(newEndRegistrationDate);



      const newEvent: AppEvent = {
        title: this.title?.value || "",
        capacity: parseInt(this.capacity?.value || "10"),
        nRegistrations: 0,
        startDate: newStartDate,
        endDate: newEndDate,
        startRegistration: newStartRegistrationDate,
        endRegistration: newEndRegistrationDate,
        local: this.local?.value || "",
        description: this.description?.value || "",
        citizens: [],
        municipality: this.municipalityName,
        image: '',
      }

      this.eventService.createEvent(newEvent, this.image).subscribe(
        (event) => {
          this.error = null;
          this.isDialogOpen = true;
          console.log(event);
        },
        (error) => {
          console.log(error)
          this.error = error.error.message;
          window.scrollTo(0, 0);
        }
      );
    }

  }

  /**
   * Cria um objeto do tipo date 
   * @param date
   * @param time
   * @returns
   */
  createDateTime(date: Date, time: string): Date {
    let partTime = time.split(':');
    let startHour = parseInt(partTime[0]);
    let partEndHout = parseInt(partTime[1]);

    let newDate = new Date(date);
    newDate.setHours(startHour);
    newDate.setMinutes(partEndHout);

    return newDate;

  }

  /**
   * Atualiza a data com base no timezoneoffset 
   * @param date
   * @param timezoneOffSetMinutets
   * @return
   */
  updateDateTimeWithOffSet(date: Date) {
    const timezoneOffsetMinutes = date.getTimezoneOffset();

    date.setHours(date.getHours() - timezoneOffsetMinutes / 60);

    return date;
  }



  /**
   * Evento dispultado aquando do selecionamento de uma imagem
   * @param event
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
   * Método responsável por validar se o ficheiro é uma imagem
   * @param file
   * @returns
   */

  isValidImageFile(file: File): boolean {
    // Adicione aqui a lógica para validar se o arquivo é uma imagem
    // Por exemplo, verificando a extensão do arquivo ou seu tipo MIME
    return file.type.startsWith('image/');
  }

  /**
   * Método responsável por prevenir o comportamento padrão do navegador
   * @param event
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Método responsável por prevenir o comportamento padrão do navegador
   * @param event
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    const files: FileList | null = event.dataTransfer?.files || null;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && this.isValidImageFile(file)) { // Verifique se file não é null ou undefined
        this.image = file;
        this.imageUrl = URL.createObjectURL(this.image);

      } else {
        console.error('Por favor, solte uma imagem válida.');
      }
    } else {
      console.error('Nenhuma imagem solta.');
    }
  }

  /**
   * Método responsável pelo cancelamento do evento
   */
  cancel() {
    this.router.navigate(['/events']);
  }


  /**
   * Método responsável por fechar o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
    this.router.navigate(['/events']);
  }


}
