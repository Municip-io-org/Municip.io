import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

/**
 * Componente para a página principal de paragens.
 */
@Component({
  selector: 'app-stops-page',
  templateUrl: './stops-page.component.html',
  styleUrls: ['./stops-page.component.css']
})
export class StopsPageComponent implements OnInit {
  municipality: string = '';
  selectedStop: string = '';

  /**
   * Método construtor para instanciar o componente.
   * @param service serviço UserAuthService
   * @param route serviço route
   */
  constructor(private service: UserAuthService, private route: ActivatedRoute) { }

  /**
   * Método oninit
   */
  ngOnInit(): void {
    this.selectedStop = this.route.snapshot.params['selectedStop'];


    this.service.getMunicipality().toPromise().then((municipality) => {
      this.municipality = municipality || '';
    });
  }
}
