import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { Municipality } from '../municipal-admin-auth.service';
import { Citizen } from '../citizen-auth.service';

@Injectable({
  providedIn: 'root'
})
 /**
  * Service for events
  */
export class EventsService {

  /**
   * @constructor
   * EventsService 
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtem a lista de eventos
   * 
   * @returns A lista de eventos
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('api/events/GetEvents');
  }

   /**
    * Obtem a lista cidadãos inscritos num evento
    * 
    * @param eventId O ID do evento
    * @returns A lista de cidadãos
    */
  GetEnrolledInEvent(eventId: string): Observable<Citizen[]> {
    return this.http.get<Citizen[]>(`api/events/GetEnrolledInEvent?eventId=${eventId}`);
  }

  /**
   * Obtem os Eventos de um utilizador
   * 
   * @param email email de um utilizador
   * @returns Os eventos em que o utilizador está inscrito
   */
  getUserEvents(email: string): Observable<Event[]> {
    const params = { email: email };
    return this.http.get<Event[]>('api/events/GetEventsByCitizen', { params: params });
  }

  /**
   *
   * Criacão de um evento
   * 
   * @param event Evento a criar
   * @param image Imagem do evento
   * @returns O Evento criado
   */
  createEvent(event: Event, image: File) {
    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";

    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        event.image = response['data']['link'];
        return this.http.post<Event>('api/events/CreateEvent', event);
      }));

  }

  /**
   * Atualiza um evento
   * 
   * @param event O Evento a atualizar
   * @param image A imagem do evento a atualizar
   * @returns O evento autalizado
   */
  updateEvent(event: Event, image?: File) {
    if (!image) return this.http.put<Event>('api/events/UpdateEvent', event);


    var headers = new HttpHeaders({ 'authorization': 'Client-ID a9e7323ad868dd2' });
    let imgurl = "https://api.imgur.com/3/image";



    //upload to imgur
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(imgurl, formData, { headers })
      .pipe(switchMap((response: any) => {
        event.image = response['data']['link'];
        return this.http.put<Event>('api/events/UpdateEvent', event);
      }));
  }


  /**
   * Desincreve um cidadão de um evento
   * 
   * @param eventId O evento
   * @param email O cidadão
   * @returns A desinscrição de um evento
   */
  dropOutEvent(eventId: string, email: string) {
email=email.replace('@', '%40');
    return this.http.post<any>(`api/events/DropOutCitizen?eventId=${eventId}&email=${email}`, {});
  }

  /**
   * Inscreve um cidadão num evento
   * 
   * @param eventId O ID de um evento
   * @param email O enail do cidadão
   * @returns A inscrição do cidadão
   */
  enrollEvent(eventId: string, email: string) {
    email=email.replace('@', '%40');
    return this.http.post<any>(`api/events/EnrollCitizen?eventId=${eventId}&email=${email}`, {});
  }

  /**
   * Paginação da página de evento
   * 
   * @param page A pagina
   * @param itemsPerPage Número de itens por página
   * @param events Os eventos da pagina
   * @returns Os eventos por página
   */
  getPaginationEvent(page = 1, itemsPerPage = 10, events: Event[]) :Event[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(events.slice(startIndex, endIndex));
    return events.slice(startIndex, endIndex);
  }

  /**
   * Obtem os Eventos por cidadão
   * @param email O email de um cidadão
   * @returns Os eventos de um cidadão
   */
  getEventByCitizen(email: string) {
    return this.http.get<Event[]>(`api/events/GetEventsByCitizen?email=${email}`)
  }

  /**
   * Obter eventos por Município
   * @param municipalityName O nome do Município
   * @returns A lista de eventos do município
   */
  getEventByMunicipality(municipalityName: string) {
    return this.http.get<Event[]>(`api/events/GetEventsByMunicipality?municipalityName=${municipalityName}`);
  }

  /**
   * Obter um evento pelo seu ID
   * 
   * @param eventId O ID de um evento
   * @returns O Evento
   */
  getEventById(eventId: string) {
    return this.http.get<Event>(`api/events/GetEventById?eventId=${eventId}`);
  }

  /**
   * Remover um evento 
   * @param eventId o ID do evento a remover
   * @returns A remoção de o evento
   */
  removeEvent(eventId: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`api/events/RemoveEvent?eventId=${eventId}`, { observe: 'response' });
  }
}

export interface Event {
  id?: string;
  title: string;
  capacity: number;
  nRegistrations: number;
  startDate: Date;
  endDate: Date;
  startRegistration: Date;
  endRegistration: Date;
  local: string;
  image: string;
  description: string;
  citizens?: Citizen[];
  municipality: string;
}
