import { Injectable } from '@angular/core';
import { RequestDocument, StatusDocument } from '../services/documents/docs.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Citizen } from '../services/citizen-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { Municipality } from '../services/municipal-admin-auth.service';


@Injectable({
  providedIn: 'root'
})
/**
 * @class DocsDataService
 *
 * Este serviço é responsável por gerar um PDF.
 *
 * @param document - O documento.
 * @param emblemPhoto - A foto do emblema.
 * 
 * @returns Um PDF gerado.
 *
 **/
export class DocsDataService {
  document: RequestDocument | null = null;
  emblemPhoto: string = '';

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
  downloadPDF(canvas: HTMLCanvasElement, name: string) {

    const pdf = new jspdf('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const scale = Math.min(width / canvas.width, height / canvas.height);
    pdf.addImage(canvas, 'PNG', 0, 0, canvas.width * scale, canvas.height * scale);


    //add image based on url
    const img = new Image();
    img.src = this.emblemPhoto;
    img.crossOrigin = '';

      pdf.addImage(img, 'png', 160, 30, 20, 20);


    pdf.save(name);

    
  } 

 
}
