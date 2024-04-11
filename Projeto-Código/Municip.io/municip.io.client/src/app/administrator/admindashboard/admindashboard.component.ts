import { Component } from '@angular/core';
import { MunicipalityStatusService } from '../../services/municipality-status.service';
import { Municipality } from '../../services/municipal-admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
  //documentação

  /**
   * @class AdmindashboardComponent
   *
   * Este componente é responsável pelo dashboard do administrador, onde é possível aprovar ou eliminar municípios.
   * 
   * @param sortType - O tipo de ordenação da tabela.
   * @param sortReverse - A ordem de ordenação da tabela.
   * @param nameSearch - O nome do município a pesquisar.
   * @param municipalities - A lista de municípios.
   *
   * @returns A card with the team member's name, description and photo.
   *
   **/
export class AdmindashboardComponent {


  sortType = 'name';
  sortReverse = false;
  nameSearch: string = '';
  municipalities: any[] = [];

  /**
   * @constructor
   *
   * Este construtor é responsável por injetar o serviço de estado do município e o router.
   *
   * @param municipalityStatusService - O serviço de estado do município.
   * @param router - O router.
   *
   **/
  constructor(private municipalityStatusService: MunicipalityStatusService, private router: Router,
  ) { }

  /**
   * Este método é responsável por obter a lista de municípios.
   * 
   * @returns A lista de municípios.
   *
   **/
  ngOnInit() {
    this.municipalityStatusService.getMunicipalities().subscribe((municipalities: any) => {
      this.municipalities = municipalities;
    });
  }

  /**
   * Este método é responsável por aprovar um município.
   * 
   * @param name - O nome do município a aprovar.
   *
   **/
  approveMunicipality(name: any) {
    this.municipalityStatusService.approveMunicipality(name).subscribe((municipalities: any) => {
      this.municipalities = municipalities;
    });
  }

  /**
   * Este método é responsável por eliminar um município.
   * 
   * @param name - O nome do município a eliminar.
   *
   **/
  deleteMunicipality(name: any) {
    this.municipalityStatusService.deleteMunicipality(name).subscribe((municipalities: any) => {
      this.municipalities = municipalities;
    })
  }


  /**
   * Este método é responsável por ordenar a tabela.
   * 
   * @param column - A coluna a ordenar.
   *
   **/
  sortTable(column: string): void {
    if (this.sortType === column) {

      this.sortReverse = !this.sortReverse;
    } else {

      this.sortType = column;
      this.sortReverse = false;
    }


    this.municipalities.sort((a: any, b: any) => {
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
   * Este método é responsável por filtrar os municípios.
   * 
   * @returns A lista de municípios filtrada.
   *
   **/
  get filteredMunicipalities() {
    return this.municipalities.filter(m => m.name.toLowerCase().includes(this.nameSearch.toLowerCase()));
  }

  /**
   * Este método é responsável por ordenar uma string.
   * 
   * @param a - A primeira string a ordenar.
   * @param b - A segunda string a ordenar.
   *
   **/
  private sortString(a: string, b: string): number {
    return a.localeCompare(b) * (this.sortReverse ? -1 : 1);
  }

  /**
   * Este método é responsável por ordenar um número.
   * 
   * @param a - O primeiro número a ordenar.
   * @param b - O segundo número a ordenar.
   *
   **/
  private sortNumeric(a: number, b: number): number {
    return (a - b) * (this.sortReverse ? -1 : 1);
  }


  /**
   * Este método é responsável por redirecionar para a página de um município.
   * 
   * @param municipality - O município a redirecionar.
   *
   **/
  sendToPage(municipality: Municipality) {
    this.router.navigate(['/admindashboard/', municipality.name]);
  }
}



