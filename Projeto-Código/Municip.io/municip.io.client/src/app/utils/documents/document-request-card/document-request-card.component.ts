import { Component, Input } from '@angular/core';

import {DocsService, RequestDocument, DocumentTemplate, StatusDocument } from '../../../services/documents/docs.service';
import { Citizen } from '../../../services/citizen-auth.service';
import { Roles, UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-request-card',
  templateUrl: './document-request-card.component.html',
  styleUrl: './document-request-card.component.css'
})
export class DocumentRequestCardComponent {

  @Input() template: DocumentTemplate = {
    name: 'Sem Título',
    description: "Sem legenda",
    type: "",
    municipality: "Sem Município",
    price: 0,
    textTemplate: ''
  }


  constructor(private documentsService: DocsService, private userAuthService: UserAuthService, private router: Router) { }

  async sendRequest() {

    this.userAuthService.getUserData().subscribe(
      res => {
        let user: any;
        user = res;
        this.userAuthService.getInfoByEmail(user.email).subscribe(
          async (res: any) => {
            user = res;

            const userRole = await this.userAuthService.getUserRole().toPromise();
            console.log(userRole);

            if (userRole.role === "Citizen") {
              console.log("ENTROU");

              var documentRequest: RequestDocument = {
                documentTemplate: this.template,
                name: this.template.name,
                citizen: user as Citizen,
                municipality: this.template.municipality,
                status: StatusDocument.pending,
                date: new Date(),
              };

              console.log(user);
              console.log(documentRequest);

              this.documentsService.createRequest(user.email, documentRequest).subscribe({
                next: (res: any) => {
                
                 
                    this.router.navigateByUrl('documents/my');
                 
                },
                error: (error) => {
                  // Ocorreu um erro durante a requisição
                  console.error("Erro durante a requisição:", error);
                }
              });
            }


          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );
    
    
  }

}
