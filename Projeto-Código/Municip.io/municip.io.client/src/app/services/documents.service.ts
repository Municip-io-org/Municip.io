import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[] = [
    { id: 1, type: DocumentType.Alvara, name: 'Alvará de funcionamento', subTitle: "O Alvará de Funcionamento é uma autorização concedida pela municipalidade que atesta que este estabelecimento está em conformidade com as leis e regulamentos locais, garantindo que as atividades aqui realizadas estão em linha com as normas de segurança, saúde e meio ambiente. Essa certificação é fundamental para garantir a legalidade e qualidade dos serviços oferecidos, promovendo a confiança e bem-estar de nossa comunidade.", status: StatusDocument.approved, date: new Date('2021-12-01'), municipality: "Setúbal" },
    { id: 2, type: DocumentType.Requirement, name: 'Requerimento de passaporte', subTitle: "Este requerimento de passaporte é sua porta de entrada para o mundo. Ao preencher este formulário, você está iniciando o processo que permitirá explorar novas culturas, conhecer novas pessoas e criar memórias inesquecíveis.", status: StatusDocument.approved, date: new Date('2020-12-01'), municipality: "Setúbal" },
    { id: 3, type: DocumentType.Certeficated, name: 'Certificado de Residência', subTitle: "Este Certificado de Residência é uma confirmação oficial da sua residência na nossa comunidade. Serve como prova de morada para diversos fins, desde inscrições escolares até procedimentos legais. É uma garantia da sua ligação com a nossa comunidade e uma parte essencial da sua identidade local. Este certificado é emitido com precisão e cuidado para o auxiliar nas suas várias necessidades administrativas e legais.", status: StatusDocument.pending, date: new Date('2020-12-01'), municipality: "Setúbal" },
    { id: 4, type: DocumentType.Other, name: 'Certidão de Nascimento', subTitle: "Esta Certidão de Nascimento é um documento vital que atesta o seu nascimento e identidade. É um registo oficial do seu início de vida e é necessário para uma variedade de propósitos, desde a obtenção de documentos de identificação até a inscrição em programas governamentais. ", status: StatusDocument.rejected, date: new Date('2020-10-01'), municipality: "Setúbal" }
  ];

  constructor() { }

  //get all documents
  getDocuments(): Observable<Document[]>  {
    return of(this.documents);
  }


}


export interface Document {
  id: number;
  type: DocumentType;
  name: string;
  subTitle: string;
  status: StatusDocument;
  date: Date;
  municipality: string;
}

export enum StatusDocument {
  pending = 'Pendente',
  approved = 'Aprovado',
  rejected = 'Rejeitado'
}

export enum DocumentType {
  Requirement = "Requerimento",
  Alvara = 'Alvará',
  Certeficated = 'Certificado',
  Other = 'Outro'
}
