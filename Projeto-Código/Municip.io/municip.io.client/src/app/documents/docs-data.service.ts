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
export class DocsDataService {
  document: RequestDocument | null = null;

  downloadPDF(canvas: HTMLCanvasElement, name: string) {

    const pdf = new jspdf('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const scale = Math.min(width / canvas.width, height / canvas.height);
    pdf.addImage(canvas, 'PNG', 0, 0, canvas.width * scale, canvas.height * scale);
    pdf.save(name);

    
  } 

 
}
