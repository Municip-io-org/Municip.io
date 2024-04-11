
import { ChangeDetectorRef, Component } from '@angular/core';
import { Roles, UserAuthService } from '../../services/user-auth.service';
import { MunicipalAdministrator, Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';
import { AdminStatisticsDashboardComponent } from '../../admin-statistics-dashboard/admin-statistics-dashboard.component';
import { AdminStatisticsService } from '../../services/stats/admin-statistics.service';

@Component({
  selector: 'app-mun-admin-home-page',
  templateUrl: './mun-admin-home-page.component.html',
  styleUrl: './mun-admin-home-page.component.css'
})
/**
 * Municipal Administrator Home Page Component
 *
 * Este componente representa a página inicial do administrador municipal
 *
 * @param userAuthService - Serviço de autenticação do utilizador
 * @param router - O Router
 * @param adminStatisticsService - Serviço de estatísticas do administrador
 * @param cdr - O ChangeDetectorRef
 */
export class MunAdminHomePageComponent {

  /**
   * @constructor
   * MunAdminHomePageComponent
   *
   * @param userAuthService - Serviço de autenticação do utilizador
   * @param router - O Router
   * @param adminStatisticsService - Serviço de estatísticas do administrador
   * @param cdr - O ChangeDetectorRef
   */
  constructor(private userAuthService: UserAuthService, private router: Router, private adminStatisticsService: AdminStatisticsService, private cdr: ChangeDetectorRef) { }


  anyUser: any;

  user: MunicipalAdministrator = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    municipality: ''
  };


  municipality: Municipality = {
    areaha: '0',
    codigo: '0',
    codigoine: '0',
    codigopostal: 'Sem código postal',
    contact: 'Sem contato',
    description: 'Sem descrição',
    descpstal: 'Sem descrição postal',
    distrito: 'Sem distrito',
    eleitores: '0',
    email: 'sem_email@example.com',
    fax: 'Sem fax',
    localidade: 'Sem localidade',
    name: 'Sem nome',
    nif: '000000000',
    populacao: '0',
    president: 'Sem presidente',
    rua: 'Sem rua',
    sitio: 'Sem sitio',
    telefone: 'Sem telefone',
    emblemPhoto: 'Sem emblema',
    landscapePhoto: 'Sem landscape',
  };

  documentsToPay: string = 'empty';
  documentsToApprove: string = 'empty';



  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit(): void {
    this.userAuthService.getUserData().subscribe(
      res => {
        this.anyUser = res;
        this.userAuthService.getInfoByEmail(this.anyUser.email).subscribe(
          res => {
            this.user = res as MunicipalAdministrator;

            this.userAuthService.getInfoMunicipality(this.user.municipality).subscribe(
              res => {
                this.municipality = res as Municipality;

                this.adminStatisticsService.getPendingRequestsByMunicipality(this.municipality.name).subscribe(
                  res => {
                    this.documentsToApprove = res.toString();
                    console.log("aqui" + this.documentsToApprove);
                    this.cdr.detectChanges(); 


                    this.adminStatisticsService.getWaitingForPaymentRequestsByMunicipality(this.municipality.name).subscribe(
                      res => {
                        this.documentsToPay = res.toString();
                        console.log("aqui" + this.documentsToPay);
                        this.cdr.detectChanges();
                     

                      },
                      error => {
                        console.error(error);
                      }
                    )


                  },
                  error => {
                    console.error(error);
                  }
                )
              });
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



  /**
   * pendingCitizensClick
   *
   * Abre os cidadãos pendentes
   */
  pendingCitizensClick() {
    this.router.navigateByUrl("/");
  }


  /**
   * approveDocumentsClick
   *
   * Aprova os documentos
   */
  approveDocumentsClick() {
    this.router.navigateByUrl("/");
  }
}

