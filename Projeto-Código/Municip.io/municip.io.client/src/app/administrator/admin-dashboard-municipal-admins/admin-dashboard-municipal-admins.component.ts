import { Component } from '@angular/core';
import { MunicipalityStatusService } from '../../services/municipality-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { Municipality } from '../../services/municipal-admin-auth.service';



@Component({
  selector: 'app-admin-dashboard-municipal-admins',
  templateUrl: './admin-dashboard-municipal-admins.component.html',
  styleUrl: './admin-dashboard-municipal-admins.component.css'
})

/**
 * @class AdminDashboardMunicipalAdminsComponent
 *
 * Este componente é responsável por exibir a lista de administradores municipais de um município.
 * 
 * @param sortType - O tipo de ordenação da tabela.
 * @param sortReverse - A ordem de ordenação da tabela.
 * @param nameSearch - O nome do administrador municipal a pesquisar.
 * @param admins - A lista de administradores municipais.
 * @param municipalName - O nome do município.
 * @param isDialogOpen - A flag que indica se o diálogo está aberto.
 * @param selectedUser - O utilizador selecionado.
 *
 *
 **/
export class AdminDashboardMunicipalAdminsComponent {

  sortType = 'firstName';
  sortReverse = false;
  nameSearch: string = '';
  admins: any[] = [];
  municipalName = 'Inicial';
  isDialogOpen: boolean = false;
  selectedUser: any;
  isMunicipalityApproved: boolean = false;
  municipalityStatus = '';
  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de estado do município, o router e o ActivatedRoute.
   *
   * @param municipalityStatusService - O serviço de estado do município.
   * @param router - O router.
   * @param route - O ActivatedRoute.
   *
   **/
  constructor(private userAuthService: UserAuthService, private municipalityStatusService: MunicipalityStatusService, private router: Router, private route: ActivatedRoute) { }

  /**
   * Este método é responsável por obter a lista de administradores municipais de um município.
   * 
   * @returns A lista de administradores municipais.
   *
   **/
  ngOnInit() {
    this.municipalName = this.route.snapshot.params['municipalName'];
    this.municipalityStatusService.getMunicipalAdmins(this.municipalName).subscribe((admins: any) => {
      this.admins = admins;
    });

    this.userAuthService.getInfoMunicipality(this.municipalName).subscribe(
      (municipality: any) => {
        this.isMunicipalityApproved = municipality.status === 'Approved';
        this.municipalityStatus = municipality.status;
      }
    );
  }

  /**
   * Abre o diálogo para exibir informações detalhadas do usuário selecionado.
   * @param user O usuário selecionado.
   */
  openDialog(user: any) {
    this.selectedUser = user;
    this.isDialogOpen = true;
  }


  /**
   * Fecha o diálogo.
   */
  closeDialog() {
    this.isDialogOpen = false;
  }

  /**
   * Aprova um administrador municipal.
   * @param email O email do administrador municipal a ser aprovado.
   */
  approveAdmin(email: any) {
    this.municipalityStatusService.approveMunicipalAdmin(email).subscribe((admins: any) => {
      this.admins = admins;
    });
  }

  /**
   * Bloqueia um administrador municipal.
   * @param email O email do administrador municipal a ser bloqueado.
   */
  blockAdmin(email: any) {
    this.municipalityStatusService.blockMunicipalAdmin(email).subscribe((admins: any) => {
      this.admins = admins;
    });
  }

  /**
   * Exclui um administrador municipal.
   * @param email O email do administrador municipal a ser excluído.
   */
  deleteAdmin(email: any) {
    this.municipalityStatusService.deleteMunicipalAdmin(email).subscribe((admins: any) => {
      this.admins = admins;
    });
  }

  /**
   * Ordena a tabela de administradores municipais com base na coluna especificada.
   * @param column A coluna pela qual a tabela será ordenada.
   */
  sortTable(column: string): void {
    if (this.sortType === column) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortType = column;
      this.sortReverse = false;
    }

    this.admins.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string') {
        return this.sortString(valueA, valueB);
      } else {
        return this.sortNumeric(valueA, valueB);
      }
    });
  }


  /**
   * Obtém a lista de administradores municipais filtrada com base no nome de pesquisa.
   * @returns A lista de administradores municipais filtrada.
   */
  get filteredAdmins() {
    return this.admins.filter(m => m.firstName.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * Compara duas strings para ordenação.
   * @param a A primeira string.
   * @param b A segunda string.
   * @returns O valor da comparação.
   */
  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  /**
   * Compara dois números para ordenação.
   * @param a O primeiro número.
   * @param b O segundo número.
   * @returns O valor da comparação.
   */
  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }

  /**
   * Navega de volta para o painel de administração.
   */
  goBack() {
    this.router.navigate(['/admindashboard']);
  }

  /**
   * Converte o estado do município para uma string legível.
   */
  municipalityStatusToString(status: string): string {
    switch (status) {
      case 'Approved':
        return 'Aprovado';
      case 'Pending':
        return 'Pendente';
      case 'Blocked':
        return 'Bloqueado';
      default:
        return '';
    }

  }
}
