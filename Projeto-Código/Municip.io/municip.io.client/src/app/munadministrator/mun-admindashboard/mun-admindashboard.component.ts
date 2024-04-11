import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitizenStatusService } from '../../services/citizen-status.service';
import { UserinfodialogComponent } from '../../utils/userinfodialog/userinfodialog.component';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-munadmindashboard',
  templateUrl: './mun-admindashboard.component.html',
  styleUrl: './mun-admindashboard.component.css'
})

/**
 * Municipal Administrator Dashboard Component
 *
 * Este componente representa o painel do administrador municipal
 *
 * @param sortType - Tipo de classificação
 * @param sortReverse - Classificação reversa
 * @param nameSearch - Pesquisa de nome
 * @param citizens - Cidadãos
 * @param municipalName - Nome do município
 * @param isDialogOpen - Diálogo aberto
 * @param selectedUser - Utilizador selecionado
 * 
 */
export class MunAdmindashboardComponent {


  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  citizens: any[] = [];
  municipalName = 'Inicial';
  isDialogOpen: boolean = false;
  selectedUser: any;

  /**
   * @constructor
   * MunAdmindashboardComponent
   *
   * @param citizenStatusService - Serviço de status do cidadão
   * @param router - O Router
   * @param route - A rota
   * @param userAuthService - Serviço de autenticação do utilizador
   */
  constructor(private citizenStatusService: CitizenStatusService, private router: Router, private route: ActivatedRoute, private userAuthService: UserAuthService) { }

  /**
   * ngOnInit
   *
   * Inicializa o componente
   */
  ngOnInit() {
    this.userAuthService.getMunicipality().subscribe((municipality: any) => {
      this.municipalName = municipality;

      this.citizenStatusService.getCitizens(this.municipalName).subscribe((citizens: any) => {
        this.citizens = citizens;

      });

    });


  }


  /**
   * openDialog
   *
   * Abre o diálogo
   */
  openDialog(user: any) {
    this.selectedUser = user;
    this.isDialogOpen = true;
  }

  /**
   * closeDialog
   *
   * Fecha o diálogo
   */
  closeDialog() {
    this.isDialogOpen = false;
  }


  /**
   * approveCitizen
   *
   * Aprova o cidadão
   *
   * @param email - Email do cidadão
   */
  approveCitizen(email: any) {
    this.citizenStatusService.approveCitizen(email).subscribe((citizens: any) => {
      this.citizens = citizens;

    });
  }

  /**
   * blockCitizen
   *
   * Bloqueia o cidadão
   *
   * @param email - Email do cidadão
   */
  blockCitizen(email: any) {
    this.citizenStatusService.blockCitizen(email).subscribe((citizens: any) => {
      this.citizens = citizens;
    })
  }




  /**
   * deleteCitizen
   *
   * Elimina o cidadão
   *
   * @param email - Email do cidadão
   */
  deleteCitizen(email: any) {
    this.citizenStatusService.deleteCitizen(email).subscribe((citizens: any) => {
      this.citizens = citizens;
    })
  }




  /**
   * sortTable
   *
   * Organiza a tabela
   *
   * @param column - Coluna
   */
  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.citizens.sort((a: any, b: any) => {
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
   * get filteredCitizens
   *
   * Obtém os cidadãos filtrados
   */
  get filteredCitizens() {
    return this.citizens.filter(m => m.firstName.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * sortString
   *
   * Organiza a string
   *
   * @param a - String a
   * @param b - String b
   * @returns Número
   */
  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  /**
   * sortNumeric
   *
   * Organiza o número
   *
   * @param a - Número a
   * @param b - Número b
   * @returns Número
   */
  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }
}





