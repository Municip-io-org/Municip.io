import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { EventsService, Event } from '../../services/events/events.service';
import { DocsService, DocumentTemplate } from '../../services/documents/docs.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrl: './edit-template.component.css'
})
/**
 * @class EditTemplateComponent
 * 
 * Este componente é responsável por editar um template de documento.
 *
 * @param municipalityImage - A imagem do município.
 * @param municipalityName - O nome do município.
 * @param propriedades - As propriedades do template.
 * @param options - As opções do template.
 * @param selectedItem - A opção selecionada.
 * @param showDropdown - A dropdown.
 * @param error - O erro.
 * @param isDialogOpen - O diálogo.
 * @param documentTemplate - O template de documento.
 * 
 * @returns Um template de documento editado.
 *
 **/
export class EditTemplateComponent {

  municipalityImage: string = "";
  municipalityName: string = "";
  propriedades: { name: string, value: string }[] = [
    { name: "Primeiro Nome", value: "firstName" },
    { name: "Apelido", value: "surname" },
    { name: "Email", value: "email" },
    { name: "NIF", value: "nif" },
    { name: "Género", value: "gender" },
    { name: "Município", value: "municipality" },
    { name: "Endereço", value: "address" },
    { name: "Codigo Postal (CP4)", value: "postalCode1" },
    { name: "Codigo Postal (CP3)", value: "postalCode2" },
    { name: "Data Nascimento", value: "birthDate" }
  ];

  options: string[] = [];
  selectedItem: string = '';
  showDropdown: boolean = false;

  error: string | null = null;


  isDialogOpen: boolean = false;


  documentTemplate!: DocumentTemplate;

  /**
   * Construtor do componente.
   * @param authService
   * @param eventService
   * @param router
   */
  constructor(private authService: UserAuthService,
    private docsService: DocsService, private router: Router,
    private route: ActivatedRoute
  ) {
    // Set the locale to pt in the calendar




  }

  


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showDropdown = false;
    }
  }


  /**
   * Metodo responsável pela inicialização  
   */
  ngOnInit(): void {
    this.authService.getUserData().subscribe((user) => {
      this.authService.getInfoByEmail(user.email).subscribe((account) => {
        this.authService.getInfoMunicipality(account.municipality).subscribe((municipality) => {
          this.municipalityImage = municipality.landscapePhoto;
          this.municipalityName = municipality.name;
          this.docsService.GetDistinctDocumentTypesFromMunicipality(this.municipalityName).subscribe((types) => {
            this.options = types;
            console.log(this.options);
          });

        });
      });

      this.documentTemplate = this.route.snapshot.data['document'];
      this.setForm(this.documentTemplate);
    });
  }

  /**
   * Coloca os valores do template no formulário
   * @param template
   */
  setForm(template: DocumentTemplate) {
    console.log(template)
    this.templateForm.setValue({
      name: template.name,
      description: template.description,
      type: template.type,
      price: template.price.toString(),
      templatetext: template.textTemplate
    });
    this.selectedItem = template.type;
    console.log(this.templateForm.value)

  }


  /**
   * Selecionar um opção
   * @param option
   */
  selectOption(option: string) {
    this.selectedItem = option;
    this.showDropdown = false;
  }


  templateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    templatetext: new FormControl('', [Validators.required])

  })

  
  /**
    * Método responsável por obter o nome.
    *
    * @returns O nome.
    *
    */
  get name() {
    return this.templateForm.get('name');
  }

  /**
   * Método responsável por obter a descrição.
   *
   * @returns A descrição.
   *
   */
  get description() {
    return this.templateForm.get('description');
  }

  /**
   * Método responsável por obter o tipo.
   *
   * @returns O tipo.
   *
   */
  get type() {
    return this.templateForm.get('type');
  }

  /**
   * Método responsável por obter o preço.
   *
   * @returns O preço.
   *
   */
  get price() {
    return this.templateForm.get('price');
  }

  /**
   * Método responsável por obter o texto do template.
   *
   * @returns O texto do template.
   *
   */
  get templatetext() {
    return this.templateForm.get('templatetext');
  }


  /**
   * Método responsável por submeter o formulário
   */
  OnSubmit() {
    if (this.templateForm.valid) {
      const template: DocumentTemplate = {
        name: this.templateForm?.get('name')?.value || "",
        description: this.templateForm?.get('description')?.value || "",
        type: this.templateForm?.get('type')?.value || "",
        price: Number(this.templateForm?.get('price')?.value) || 0,
        textTemplate: this.templateForm?.get('templatetext')?.value || '', // Provide a default value if FormControl value is null
        municipality: this.municipalityName || "vazio"
      };

      this.docsService.editTemplate(template, this.documentTemplate.id!).subscribe((template: any) => {
        this.isDialogOpen = true;
      });
    }
  }
  /**
   * Método responsável por fechar o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
    this.router.navigate(['/documents/template-list']);
  }
  /**
   * Adicionar propriedades
   */
  adicionarPropriedade() {
    const propriedadeSelecionada = (document.getElementById('propriedade') as HTMLSelectElement).value;
    const textArea = (document.getElementById('templatetext') as HTMLTextAreaElement);
    const propriedadeReal = this.propriedades.find(prop => prop.value === propriedadeSelecionada);
    if (propriedadeReal) {
      textArea.value += `[${propriedadeReal.value}]`;
    }
  }




}
