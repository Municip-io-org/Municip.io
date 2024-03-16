import { Component, Input, OnInit } from '@angular/core';
import { DocumentTemplate, RequestDocument, StatusDocument } from '../../services/documents/docs.service';
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
export class GeneratepdfComponent implements OnInit {

  document: RequestDocument | null = null;


  citizenKeys: string[] = []; // Array para armazenar as chaves do objeto citizen

  replacedText: string = '';
  municipalityInfo!: Municipality;

  constructor(private router: Router, private route: ActivatedRoute, private documentService: DocsDataService, private userAuthService: UserAuthService
  ) { }




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
      documentStatus: StatusDocument.pending,
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
        municipality: ''
      }
    };


    if (this.document && this.document.citizen) {
      const documentCopy = this.document;

      this.userAuthService.getInfoMunicipality(documentCopy.municipality).subscribe(async municipality => {
        this.municipalityInfo = municipality;



        this.replacedText = this.replaceProperties(documentCopy.citizen);

        if (municipality != null) {



          //setTimeout(async () => {
          //  await this.downloadPDFAndNavigate();
          //}, 1000); 


        }

      });
    }

  }




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



  async downloadPDFAndNavigate(): Promise<void> {
    const data = document.getElementById('contentToConvert');
    if (data) {
      const canvas = await html2canvas(data, { scale: 2 }); 

      await this.documentService.downloadPDF(canvas, 'new-file.pdf');
    } else {
      console.error('Sem conteúdo.');
    }
    this.router.navigate(['documents/my']);
  }

}
