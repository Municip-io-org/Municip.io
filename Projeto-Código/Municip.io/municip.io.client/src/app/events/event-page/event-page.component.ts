import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {
  selectedEvent: String = 'Nenhum evento selecionado';


  constructor(private userAuthService: UserAuthService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedEvent = this.router.snapshot.params['selectedEvent'];

    console.log("Evento selecionado:" + this.selectedEvent);

  }
}
