import { Component, Input, OnInit } from '@angular/core';
import { DocumentTemplate, DocumentTemplateStatus, RequestDocument, StatusDocument } from '../../services/documents/docs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsDataService } from '../docs-data.service';
import { Citizen } from '../../services/citizen-auth.service';
import { UserAuthService } from '../../services/user-auth.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { filter } from 'rxjs';

@Component({
  selector: 'app-generatepdf',
  templateUrl: './generatepdf.component.html',
  styleUrl: './generatepdf.component.css'
})
/**
 * @class GeneratepdfComponent
 *
 * Este componente é responsável por gerar um PDF.
 *
 * @param document - O documento.
 * @param citizenKeys - As chaves do objeto cidadão.
 * @param replacedText - O texto substituído.
 * @param municipalityInfo - As informações do município.
 * 
 * @returns Um PDF gerado.
 *
 **/
export class GeneratepdfComponent implements OnInit {

  document: RequestDocument | null = null;


  citizenKeys: string[] = []; // Array para armazenar as chaves do objeto citizen

  replacedText: string = '';
  municipalityInfo!: Municipality;

  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de roteamento, o serviço de ativação de rotas, o serviço de documentos e o serviço de autenticação de utilizadores.
   *
   * @param router - O serviço de roteamento.
   * @param route - O serviço de ativação de rotas.
   * @param documentService - O serviço de documentos.
   * @param userAuthService - O serviço de autenticação de utilizadores.
   *
   **/
  constructor(private router: Router, private route: ActivatedRoute, private documentService: DocsDataService, private userAuthService: UserAuthService
  ) { }




  /**
   * Este método é responsável por inicializar o componente.
   * 
   * @returns As informações do município.
   *
   **/
  ngOnInit(): void {

    this.municipalityInfo = {
      areaha: '',
      codigo: '',
      codigoine: '',
      codigopostal: '',
      contact: '',
      description: '',
      descpstal: '',
      distrito: '',
      eleitores: '',
      email: '',
      fax: '',
      localidade: '',
      name: '',
      nif: '',
      populacao: '',
      president: '',
      rua: '',
      sitio: '',
      telefone: '',
      emblemPhoto: '',
      landscapePhoto: '',

    };

    this.document = this.documentService.document || {
      name: '',
      status: StatusDocument.pending,
      date: new Date(),
      municipality: "",
      citizen: {
        firstName: '',
        surname: '',
        email: '',
        password: '',
        nif: '',
        gender: '',
        municipality: '',
        address: '',
        postalCode1: '',
        postalCode2: '',
        birthDate: new Date
      },
      documentTemplate: {
        name: '',
        description: '',
        type: '',
        price: 0,
        textTemplate: '',
        municipality: '',
        status: DocumentTemplateStatus.active
      }
    };


    if (this.document && this.document.citizen) {
      const documentCopy = this.document;

      this.userAuthService.getInfoMunicipality(documentCopy.municipality).subscribe(async municipality => {
        this.municipalityInfo = municipality;
        this.replacedText = this.replaceProperties(documentCopy.citizen);
        this.documentService.emblemPhoto = this.municipalityInfo.emblemPhoto;

     

      });
    }

  }




  /**
   * Este método é responsável por substituir as propriedades do cidadão.
   * 
   * @param citizen - O cidadão.
   *
   * @returns O texto substituído.
   *
   **/
  replaceProperties(citizen: Citizen | undefined): string {


    if (!this.document || !citizen) return '';

    let textTemplate = this.document.documentTemplate.textTemplate;
    const keys = Object.keys(citizen) as (keyof Citizen)[];

    keys.forEach(key => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      let value = citizen[key]?.toString() || '';
      if (key === 'birthDate') {
        var date = new Date(value);
        value = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().substr(-2)}`;
      }
      textTemplate = textTemplate.replace(regex, value);
    });
    return textTemplate;
  }



  /**
   * Este método é responsável por descarregar o PDF e navegar.
   * 
   * @returns O PDF descarregado.
   *
   **/
  async downloadPDFAndNavigate(): Promise<void> {
    const data = document.getElementById('contentToConvert');

    if (data) {
      const canvas = await html2canvas(data, { scale: 2 });
      await this.documentService.downloadPDF(canvas, this.document?.name+'_'+this.document?.citizen.firstName+this.document?.citizen.surname);
    } else {
      console.error('Sem conteúdo.');
    }
    this.router.navigate(['documents/my']);
  }

}
