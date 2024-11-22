import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './model/Reservation';
import { Event } from './model/Event';



@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservation/';
  private apiBase = 'http://localhost:8080/api/evenement/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient ) { }

  addReservationAndAssignEvent(reservation: Reservation, idEvent: number): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}assign/${idEvent}`, reservation);
  }

  getEvent(idEvent: number): Observable<Event>{
    const url = `${this.apiBase + "get"}/${idEvent}`;
    return this.http.get<Event>(url, this.httpOptions)

}
reserve(eventId: number, reservation: any): Observable<any> {
  return this.http.post(`${this.apiUrl}reserve/${eventId}`, reservation);
}

}
